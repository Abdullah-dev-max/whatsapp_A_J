// chat-app/server.js
const WebSocket = require('ws');

// It's good practice to get the port from environment variables,
// especially in Docker where ports might be assigned dynamically.
const port = process.env.PORT || 8080; 

const wss = new WebSocket.Server({ port: port });

wss.on('connection', ws => {
    console.log('Client connected');

    ws.on('message', message => {
        console.log(`Received message: ${message}`);
        // Broadcast the message to all connected clients
        wss.clients.forEach(client => {
            // Check if the client is not the sender and is open
            if (/*client !== ws && */ client.readyState === WebSocket.OPEN) {
                client.send(message.toString()); // Ensure message is a string
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.onerror = error => {
        console.error('WebSocket error:', error);
    };
});

console.log(`WebSocket server started on port ${port}`);