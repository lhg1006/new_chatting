const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://61.80.148.189:3000', // 클라이언트의 도메인 주소
        methods: ['GET', 'POST'], // 허용할 HTTP 메소드
    },
});

// 채팅방에 접속한 사용자들을 저장할 배열
let users = [];

// 채팅방에 새로운 사용자가 접속했을 때의 처리
io.on('connection', (socket) => {
    console.log('새로운 사용자가 접속했습니다.');

    // 사용자의 정보를 저장하고, 다른 사용자들에게 접속 알림을 보냄
    socket.on('join', (username) => {
        const user = {
            id: socket.id,
            username: username,
        };

        users.push(user);
        io.emit('userJoined', user);
    });

    // 사용자가 채팅 메시지를 보냈을 때의 처리
    socket.on('message', (message) => {
        console.log(message)
        const user = users.find((u) => u.id === socket.id);
        if (user) {
            const chatMessage = {
                user: user,
                message: message,
            };
            io.emit('message', chatMessage);
        }
    });

    // 사용자가 접속을 종료했을 때의 처리
    socket.on('disconnect', () => {
        const userIndex = users.findIndex((u) => u.id === socket.id);
        if (userIndex !== -1) {
            const user = users[userIndex];
            users.splice(userIndex, 1);
            io.emit('userLeft', user);
        }
    });
});

// 서버를 시작
const port = 3001;
http.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});