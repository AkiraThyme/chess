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
        countdownInterval: null,
      };

      socket.gameData = gameData;
      waitingPlayer.gameData = gameData;

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

          io.to(socket.id).emit('timerUpdate', safeGameData);
          io.to(socket.opponent.id).emit('timerUpdate', safeGameData);

          if (gameData.whiteTime <= 0 || gameData.blackTime <= 0) {
            clearInterval(gameData.interval);
            const winner = gameData.whiteTime <= 0 ? 'black' : 'white';

            io.to(socket.id).emit('gameOver', { reason: 'time', winner });
            if (socket.opponent) {
              io.to(socket.opponent.id).emit('gameOver', { reason: 'time', winner });
            }
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
    if (socket.opponent) {
      socket.opponent.emit('chat message', { text: data.text, sender: data.sender });
    }
  });

  socket.on('move', (data) => {
    if (socket.opponent && socket.gameData) {
      const gameData = socket.gameData;

      gameData.turn = gameData.turn === 'white' ? 'black' : 'white';

      if (gameData.turn === 'white') {
        gameData.blackTime = 60;
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

      io.to(socket.id).emit('timerUpdate', safeGameData);
      io.to(socket.opponent.id).emit('timerUpdate', safeGameData);

      clearTimeout(gameData.inactiveTimeout);
      clearInterval(gameData.countdownInterval);

      gameData.inactiveTimeout = setTimeout(() => {
        let countdown = 30;
        gameData.countdownInterval = setInterval(() => {
          countdown--;

          if (countdown <= 0) {
            clearInterval(gameData.interval);
            clearInterval(gameData.countdownInterval);

            const winner = gameData.turn === 'white' ? 'black' : 'white';

            io.to(socket.id).emit('defaultWin', { winner });
            if (socket.opponent) {
              io.to(socket.opponent.id).emit('defaultWin', { winner });
            }
          }
        }, 1000);
      }, 60000);
    }
  });

  // ✅ Added gameOver listener for checkmate, stalemate, etc.
  socket.on('gameOver', ({ resultMessage }) => {
    if (socket.opponent) {
      io.to(socket.id).emit('gameOver', { resultMessage });
      io.to(socket.opponent.id).emit('gameOver', { resultMessage });

      clearInterval(socket.gameData?.interval);
      clearTimeout(socket.gameData?.inactiveTimeout);
      clearInterval(socket.gameData?.countdownInterval);
    }
  });

  socket.on('disconnect', () => {
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

    clearInterval(socket.gameData?.interval);
    clearTimeout(socket.gameData?.inactiveTimeout);
    clearInterval(socket.gameData?.countdownInterval);
  });
});

server.listen(8076, '10.0.10.33', () => {
  console.log('Server is running on http://10.0.10.33:8076');
});
