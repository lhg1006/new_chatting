import { io } from 'socket.io-client';

export const socket = io('http://192.168.0.152:3001'); // 서버의 도메인 주소 ( 집 -> 192.168.0.152   , 회사 61.80.148.189