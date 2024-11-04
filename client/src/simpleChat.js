import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:5000'); // Flask 서버 IP와 포트

function SimpleChat() {
    const [message, setMessage] = useState('');
    const [chat, setChat] = useState([]);

    useEffect(() => {
        socket.on('receive_message', (data) => {
            setChat((prevChat) => [...prevChat, data.msg]);
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    const sendMessage = () => {
        socket.emit('send_message', { msg: message });
        setMessage('');
    };

    return (
        <div>
            <h2>Simple Chat</h2>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
            <div>
                <h3>Messages:</h3>
                <ul>
                    {chat.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SimpleChat;
