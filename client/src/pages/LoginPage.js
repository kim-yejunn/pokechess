import React, { useState } from 'react';

function LoginPage({ setIsAuthenticated }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        // 간단한 예시로 'admin'과 'password'가 맞는 경우 로그인 성공으로 설정
        if (username === 'aaa' && password === '1234') {
            setIsAuthenticated(true); // 로그인 상태를 true로 설정
            setError(''); // 오류 메시지 초기화
        } else {
            setError('아이디 또는 비밀번호가 잘못되었습니다.');
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            <div>
                <input
                    type="text"
                    placeholder="아이디"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button onClick={handleLogin}>로그인</button>
        </div>
    );
}

export default LoginPage;
