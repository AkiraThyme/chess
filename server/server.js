const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const util = require('util');
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

let waitingPlayer = null;

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('findOpponent', () => {
    if (waitingPlayer) {
      socket.emit('assignColor', { color: 'black' });
      waitingPlayer.emit('assignColor', { color: 'white' });

      socket.emit('matchFound');
      waitingPlayer.emit('matchFound');

      // Assign opponents to each other
      socket.opponent = waitingPlayer;
      waitingPlayer.opponent = socket;

      // Initialize game data...
      const initialTime = 60;
      const gameData = {
        whiteTime: initialTime,
        blackTime: initialTime,
        turn: 'white',
        interval: null,
        inactiveTimeout: null,
      };

      socket.gameData = gameData;
      waitingPlayer.gameData = gameData;

      // Start Timer
      const startTimer = () => {
        gameData.interval = setInterval(() => {
          if (gameData.turn === 'white') {
            gameData.whiteTime--;
          } else {
            gameData.blackTime--;
          }

          const safeGameData = {
            whiteTime: gameData.whiteTime,
            blackTime: gameData.blackTime,
            turn: gameData.turn,
          };

          if (socket.opponent) {
            console.log(`Timer Update - ${socket.id}:`, util.inspect(safeGameData, { depth: 5, colors: true }));
            io.to(socket.id).emit('timerUpdate', safeGameData);
            io.to(socket.opponent.id).emit('timerUpdate', safeGameData);
          }

          if (gameData.whiteTime <= 0 || gameData.blackTime <= 0) {
            clearInterval(gameData.interval);
            const winner = gameData.whiteTime <= 0 ? 'black' : 'white';
            console.log(`Game Over - Winner: ${winner}`);
            io.to(socket.id).emit('gameOver', { reason: 'time', winner });
            io.to(socket.opponent.id).emit('gameOver', { reason: 'time', winner });
          }
        }, 1000);
      };

      startTimer();

      waitingPlayer = null;
    } else {
      waitingPlayer = socket;
    }
  });

  socket.on('chat message', (data) => {
    console.log(`Chat message from ${socket.id}:`, util.inspect(data, { depth: 5, colors: true }));
    if (socket.opponent) {
      socket.opponent.emit('chat message', { text: data.text, sender: data.sender });
    }
  });

  // socket.on('move', (data) => {
  //   console.log(`Move from ${socket.id}:`, util.inspect(data, { depth: 5, colors: true }));

  //   if (socket.opponent && socket.gameData) {
  //     const gameData = socket.gameData;

  //     gameData.turn = gameData.turn === 'white' ? 'black' : 'white';

  //     io.to(socket.id).emit('move', data);
  //     io.to(socket.opponent.id).emit('move', data);

  //     const safeGameData = {
  //       whiteTime: gameData.whiteTime,
  //       blackTime: gameData.blackTime,
  //       turn: gameData.turn,
  //     };

  //     console.log(`Timer Update (After Move) - ${socket.id}:`, util.inspect(safeGameData, { depth: 5, colors: true }));
  //     io.to(socket.id).emit('timerUpdate', safeGameData);
  //     io.to(socket.opponent.id).emit('timerUpdate', safeGameData);

  //     // Clear inactivity timeout when a move is made
  //     clearTimeout(gameData.inactiveTimeout);

  //     // Start a 1-minute inactivity grace period
  //     gameData.inactiveTimeout = setTimeout(() => {
  //       let countdown = 30;
  //       const countdownInterval = setInterval(() => {
  //         countdown--;
      
  //         if (countdown <= 0) {
  //           clearInterval(countdownInterval);
  //           clearInterval(gameData.interval);
      
  //           const winner = gameData.turn === 'white' ? 'black' : 'white';
      
  //           console.log(`Default Win (Inactivity) - Winner: ${winner}`);
  //           io.to(socket.id).emit('defaultWin', { winner });
  //           io.to(socket.opponent.id).emit('defaultWin', { winner });
  //         }
  //       }, 1000);
  //     }, 60000);      
  //   }
  // });


  socket.on('move', (data) => {
    console.log(`Move from ${socket.id}:`, util.inspect(data, { depth: 5, colors: true }));
  
    if (socket.opponent && socket.gameData) {
      const gameData = socket.gameData;
  
      // Switch turn
      gameData.turn = gameData.turn === 'white' ? 'black' : 'white';
  
      // Reset the timer for the player who just moved
      if (gameData.turn === 'white') {
        gameData.blackTime = 60; // Opponent gets reset after this player's move
      } else {
        gameData.whiteTime = 60;
      }
  
      io.to(socket.id).emit('move', data);
      io.to(socket.opponent.id).emit('move', data);
  
      const safeGameData = {
        whiteTime: gameData.whiteTime,
        blackTime: gameData.blackTime,
        turn: gameData.turn,
      };
  
      console.log(`Timer Reset After Move - ${socket.id}:`, util.inspect(safeGameData, { depth: 5, colors: true }));
      io.to(socket.id).emit('timerUpdate', safeGameData);
      io.to(socket.opponent.id).emit('timerUpdate', safeGameData);
  
      // Clear inactivity timeout when a move is made
      clearTimeout(gameData.inactiveTimeout);
  
      // Start a new inactivity grace period
      gameData.inactiveTimeout = setTimeout(() => {
        let countdown = 30;
        const countdownInterval = setInterval(() => {
          countdown--;
      
          if (countdown <= 0) {
            clearInterval(countdownInterval);
            clearInterval(gameData.interval);
      
            const winner = gameData.turn === 'white' ? 'black' : 'white';
      
            console.log(`Default Win (Inactivity) - Winner: ${winner}`);
            io.to(socket.id).emit('defaultWin', { winner });
            io.to(socket.opponent.id).emit('defaultWin', { winner });
          }
        }, 1000);
      }, 60000);      
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  
    if (waitingPlayer === socket) {
      waitingPlayer = null;
    }
  
    if (socket.opponent) {
      const opponent = socket.opponent;
  
      opponent.emit('opponentDisconnected');
  
      clearInterval(socket.gameData?.interval);
      clearTimeout(socket.gameData?.inactiveTimeout);
      clearInterval(socket.gameData?.countdownInterval);
  
      opponent.gameData = null;
      opponent.opponent = null;
    }
  });
  
});

server.listen(8076, '10.0.10.33', () => {
  console.log('Server is running on http://10.0.10.33:8076');
});
