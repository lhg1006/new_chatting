const express = require('express');
const app = express();
const http = require('http').createServer(app);
const domain = process.env.NEXT_PUBLIC_DOMAIN;
const io = require('socket.io')(http, {
    cors: {
        origin: 'http://61.80.148.189:4000', // 올바른 클라이언트 도메인 주소로 변경
        methods: ['GET', 'POST'], // 허용할 HTTP 메소드
    },
});

// 채팅방에 새로운 사용자가 접속했을 때의 처리
io.on('connection', (socket) => {
    console.log('새로운 사용자가 접속했습니다.');

    socket.on('joinRoom', (data) => {
        socket.join(data.roomNo);
        const chatData = {
            userNick: data.userNick,
            message: `님이 ${data.roomNo}번 방에 입장했습니다.`,
        };
        io.to(data.roomNo).emit('chatMessage', chatData)

        console.log(`[${data.userNick}] 님이 ${data.roomNo}번 방에 입장했습니다.`);
    });

    // 클라이언트로부터 새로운 메시지를 받았을 때
    socket.on('newMessage', (data) => {
        const { room, message, userNick } = data;
        console.log(`방 ${room}에서 새로운 메시지 [${userNick}]: ${message}`);

        // 특정 방에 속한 모든 클라이언트에게 메시지를 방송합니다.
        const chatData = {
            userNick: userNick,
            message: message,
        };
        io.to(room).emit('chatMessage', chatData);
    });

    // 연결이 끊겼을 때
    socket.on('disconnect', () => {
        console.log('사용자가 연결을 끊었습니다.');
    });

});

// 서버를 시작
const port = 4001;
http.listen(port, () => {
    console.log(`서버가 ${port} 포트에서 실행 중입니다.`);
});