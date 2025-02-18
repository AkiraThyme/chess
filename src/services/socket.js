// src/services/socket.js

// Import the 'io' function from the 'socket.io-client' library
import { io } from 'socket.io-client';

// Create a socket connection to the localhost server on port 3000
const socket = io('http://10.0.10.33:8076');

// Export the socket instance for use in other parts of the application
export default socket;
