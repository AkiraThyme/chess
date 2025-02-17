// src/services/socket.js

// Import the 'io' function from the 'socket.io-client' library
import { io } from 'socket.io-client';

// Create a socket connection to the localhost server on port 3000
const socket = io('http://localhost:3000');

// Export the socket instance for use in other parts of the application
export default socket;
