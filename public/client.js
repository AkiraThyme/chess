const socket = io('http://10.0.10.33:8076');


// Handle color assignment
socket.on('assignColor', (color) => {
  console.log(`Assigned color: ${color}`);
  // You can trigger Vue logic here if integrating into a component
  window.dispatchEvent(new CustomEvent('assignColor', { detail: { color } }));

  if (color === 'black') {
    board.orientation('black'); // Rotate the board
  } else {
    board.orientation('white'); // Default perspective
  }
});

socket.on('chat message', (msg) => {s
  console.log('Message received:', msg);
  window.dispatchEvent(new CustomEvent('chatMessage', { detail: msg }));
});


socket.on('gameOver', (data) => {
  alert(`Game Over! Winner: ${data.winner}. Reason: ${data.reason}`);
  // You can show your custom popup/modal logic here
  showGameOverPopup(data.winner, data.reason);
});

// Handle match found
socket.on('matchFound', () => {
  console.log('Opponent found, starting the game!');
  window.dispatchEvent(new CustomEvent('matchFound'));
});



// Handle opponent's move
socket.on('move', (moveData) => {
  console.log('Received move from opponent:', moveData);
  window.dispatchEvent(new CustomEvent('opponentMove', { detail: moveData }));
});

// Handle opponent disconnect
socket.on('opponentDisconnected', () => {
  alert('Your opponent disconnected. The game has ended.');
  window.dispatchEvent(new Event('opponentDisconnected'));
});

// Handle no opponent found (timeout)
socket.on('noOpponentFound', () => {
  alert('No opponent found. Try again later.');
  window.dispatchEvent(new Event('noOpponentFound'));
});

// Emit find opponent event
function findOpponent() {
  console.log('Finding opponent...');
  socket.emit('findOpponent');
}

// Emit move event
function sendMove(orig, dest) {
  socket.emit('move', { from: orig, to: dest });
}

socket.on('timerUpdate', (data) => {
  console.log('Timer update:', data);

  // Dispatch to notify Vue components
  window.dispatchEvent(new CustomEvent('timerUpdate', { detail: data }));
});

