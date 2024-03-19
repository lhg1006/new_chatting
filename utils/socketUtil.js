import { io } from 'socket.io-client';
const host = process.env.HOST;
const socketPort = process.env.SOCKET_PORT

export const socketUtil = io(`${host}:${socketPort}`, {
    transports: ['websocket'], // WebSocket 전송 사용
    withCredentials: false, // CORS 관련 설정
});