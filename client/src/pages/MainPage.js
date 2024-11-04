import React from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {
    const navigate = useNavigate();

    const handleGameStart = () => {
        navigate('/game'); // '/game' 경로로 이동
    };

    return (
        <div>
            <h2>Main Page</h2>
            <p>로그인에 성공했습니다! 메인 페이지에 오신 것을 환영합니다.</p>
            <button onClick={handleGameStart}>게임하기</button>
        </div>
    );
}

export default MainPage;
