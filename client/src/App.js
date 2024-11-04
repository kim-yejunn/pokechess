import React from 'react';
import SimpleChat from './simpleChat'; 
import io from 'socket.io-client';

function App() {
    return (
        <div>
            <h1>Welcome to the Chat</h1>
            <SimpleChat />
        </div>
    );
}

export default App;
