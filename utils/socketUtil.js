import { io } from 'socket.io-client';
const host = process.env.HOST;
const socketPort = process.env.SOCKET_PORT

export const socketUtil = io(`${host}:${socketPort}`);