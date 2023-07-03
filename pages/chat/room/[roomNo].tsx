import React, {useState, useEffect, useRef} from 'react';
import styles from '@/styles/chat.module.css';
import {useRouter} from "next/router";
import {socket} from '@/module/socket';

const RoomNo = () => {
    const router = useRouter()
    const roomNo = router.query.roomNo as string
    const userNick = localStorage.getItem("user_nick_name")

    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState('');

    useEffect(() => {
        if(userNick === null){
            router.push('/chat/list')
        }else{
            connectRoom();
            // 서버로부터 새로운 메시지를 받았을 때
            socket.on('chatMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });
        }
        // 컴포넌트 언마운트 시에 소켓 연결을 해제합니다.
        return () => {
            const data = {
                room: roomNo,
                message: `님이 ${roomNo} 번 방에서 퇴장하였습니다`,
                userNick: userNick
            };
            socket.emit('newMessage', data);
        };
    }, [])

    const handleSendMessage = () => {
        const messageText = ` : ${messageInput}`
        const data = {
            room: roomNo,
            message: messageText,
            userNick: userNick
        };
        socket.emit('newMessage', data);
        setMessageInput('');
    };

    const connectRoom = () =>{
        if (roomNo) {
            const data = {
                roomNo : roomNo,
                userNick : userNick
            }
            socket.emit('joinRoom', data);
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
            <div>
                방에있는사람 : 만들예정임
            </div>
            <div className={styles.chatContainer}>
                <h1 className={styles.title}>Chat Room {roomNo}</h1>
                <div className={styles.messageContainer}>
                    {messages.map((chatData, index) => (
                        <div key={index} className={styles.message}>
                            <span className={styles.userNick}>{chatData?.userNick}</span>
                            <span>{`${chatData?.message}`}</span>
                            <div className={styles.line}></div>
                        </div>
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