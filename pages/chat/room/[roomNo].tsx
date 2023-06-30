import React, {useState, useEffect, useRef} from 'react';
import styles from '@/styles/chat.module.css';
import {useRouter} from "next/router";
import {socket} from '@/module/socket';

// const socket = io('http://61.80.148.189:3001'); // 채팅 서버 URL
const RoomNo = () => {
    const router = useRouter()
    const roomNo = router.query.roomNo as string

    const [messages, setMessages] = useState<string[]>([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        connectRoom();
        // 서버로부터 새로운 메시지를 받았을 때
        socket.on('chatMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });
        // 컴포넌트 언마운트 시에 소켓 연결을 해제합니다.
        return () => {
            const data = {
                room: roomNo,
                message: `사용자가 ${roomNo} 번 방에서 퇴장하였습니다`,
            };
            socket.emit('newMessage', data);
        };
    }, [])

    const handleSendMessage = () => {
        const data = {
            room: roomNo,
            message: messageInput,
        };
        socket.emit('newMessage', data);
        setMessageInput('');
    };

    const connectRoom = () =>{
        if (roomNo) {
            console.log('join', roomNo)
            socket.emit('joinRoom', roomNo);
        }
    }
    const onKeyPress = (e : React.KeyboardEvent) => {
        if(e.key == 'Enter'){
            handleSendMessage();
        }
    }

    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageContainerRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div>
            <div className={styles.chatContainer}>
                <h1 className={styles.title}>Chat Room {roomNo}</h1>
                <div className={styles.messageContainer}>
                    {messages.map((message, index) => (
                        <div key={index} className={styles.message}>{message}</div>
                    ))}
                    <div ref={messageContainerRef}></div>
                </div>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={onKeyPress}
                        className={styles.inputField}
                    />
                    <button onClick={handleSendMessage} className={styles.sendButton}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default RoomNo;