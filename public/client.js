const socket = io('http://10.0.10.33:8080');


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

socket.on('chat message', (msg) => {
  console.log('Message received:', msg);
  window.dispatchEvent(new CustomEvent('chatMessage', { detail: msg }));
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

