import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import Game from './pages/GamePage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            <div>
                <h1>Welcome to the Application</h1>
                <Routes>
                    <Route path="/" element={isAuthenticated ? <MainPage /> : <LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/game" element={<Game />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
