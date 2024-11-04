import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000'; // Flask 서버의 IP 주소

export const loginUser = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
    });
    return response.data;
};

// 다른 API 함수 추가
