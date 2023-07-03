import { io } from 'socket.io-client';
const server = process.env.NEXT_PUBLIC_SERVER;
export const socket = io('http://61.80.148.189:4001');