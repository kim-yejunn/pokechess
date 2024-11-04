import React, { useState } from 'react';
import LoginPage from './LoginPage';
import MainPage from './MainPage';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <div>
            <h1>PokeChess</h1>
            {isAuthenticated ? (
                <MainPage /> // 로그인 성공 시 MainPage를 보여줍니다
            ) : (
                <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )}
        </div>
    );
}

export default App;
