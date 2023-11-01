const rateLimit = require('express-rate-limit');
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const serverHost = 'http://61.80.148.189';
const serverPort = '4000'
const io = require('socket.io')(http, {
    cors: {
        origin: `${serverHost}:${serverPort}`,
        methods: ['GET', 'POST'], // 허용할 HTTP 메소드
    },
});
// const cors = require('cors');
// app.use(cors()); // CORS 미들웨어 추가

// 방 접속자 목록을 저장할 객체
const roomUsers = {};

// 채팅방에 새로운 사용자가 접속했을 때의 처리
io.on('connection', (socket) => {
    // 클라이언트가 방에 입장
    socket.on('joinRoom', (data) => {
        const { roomNo, userNick } = data;

        // 방 접속자 목록에 사용자 추가
        if (!roomUsers[roomNo]) {
            roomUsers[roomNo] = [];
        }
        roomUsers[roomNo].push(userNick);
        // 해당 방의 접속자 목록을 클라이언트에게 전달
        io.to(roomNo).emit('roomUsers', roomUsers[roomNo]);
        // 방에 입장
        socket.join(roomNo);
        // 입장 메시지
        const chatData = {
            userNick: userNick,
            message: `님이 ${roomNo}번 방에 입장했습니다.`,
        };
        io.to(roomNo).emit('chatMessage', chatData)

        console.log(`[${userNick}] 님이 ${roomNo}번 방에 입장했습니다.`);

        // 해당 방의 접속자 목록을 클라이언트에게 전달
        io.to(roomNo).emit('roomUsers', roomUsers[roomNo]);
    });

    // 클라이언트가 방에서 나갈 때
    socket.on('leaveRoom', (data) => {
        const { roomNo, userNick } = data;

        // 방 접속자 목록에서 사용자 제거
        if (roomUsers[roomNo]) {
            roomUsers[roomNo] = roomUsers[roomNo].filter((user) => user !== userNick);
        }
        // 방에서 퇴장
        socket.leave(roomNo);
        // 퇴장 메시지
        const chatData = {
            userNick: userNick,
            message: `님이 ${roomNo}번 방에서 퇴장했습니다.`,
        };
        io.to(roomNo).emit('chatMessage', chatData)

        console.log(`[${userNick}] 님이 ${roomNo}번 방에서 퇴장했습니다.`);

        io.to(roomNo).emit('roomUsers', roomUsers[roomNo]);
    });

    // 클라이언트로부터 새로운 메시지를 받았을 때
    socket.on('newMessage', (data) => {
        let { room, message, userNick } = data;
        console.log(`방 ${room}에서 새로운 메시지 [${userNick}]: ${message}`);

        if(message.includes("onerror") || message.includes("onload") || message.includes("function")
            || message.includes("oncanplay") || message.includes("setInterval") || message.includes("setTimeout")
            || message.includes("document.") || message.includes("() =>") || message.includes("()=>")
            || message.includes("onplaying") || message.includes("event()") || message.includes("event ()")
            || message.includes("onprogress") || message.includes("autoplay") || message.includes("eve")
            || message.includes("fixed") || message.includes("f1xed") || message.includes("mouse")){
            message = " : 나는 바보다"
        }else if (message.includes("absolute")){
            message = " : 나는 바보다이슨공기청정기"
        }

        // 해당 방의 접속자 목록을 클라이언트에게 전달
        io.to(room).emit('roomUsers', roomUsers[room]);

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

// 서버를 시작 (Socket.IO 서버는 4001 포트)
const socketServerPort = 4001;
http.listen(socketServerPort, () => {
    console.log(`Socket.IO 서버가 ${socketServerPort} 포트에서 실행 중입니다.`);
});

// API를 받는 서버 (Express.js 애플리케이션)는 4000 포트
const apiServerPort = 4002;
app.listen(apiServerPort, () => {
    console.log(`API 서버가 ${apiServerPort} 포트에서 실행 중입니다.`);
});

// rate limit 설정
const requestLimitMiddleware = rateLimit({
    windowMs: 60 * 1000, // 1분 동안의 제한
    max: 5, // 1분 동안 허용되는 최대 요청 횟수
});

app.use(requestLimitMiddleware);

// 추가적인 라우트 및 미들웨어 설정 ...