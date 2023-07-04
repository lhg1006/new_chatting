import React, {useState, useEffect, useRef} from 'react';
import styles from '@/styles/chat.module.css';
import {useRouter} from "next/router";
import {socket} from '@/module/socket';

const RoomNo = () => {
    const router = useRouter()
    const roomNo = router.query.roomNo as string

    const [userNick, setUserNick] = useState<string>("")
    const [roomUsers, setRoomUsers] = useState([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [messageInput, setMessageInput] = useState<string>('');
    const messageContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const lsNick = localStorage.getItem("user_nick_name") as string
        if (lsNick === "" || lsNick === null) {
            router.push('/chat/list')
        } else {
            setUserNick(lsNick)
        }
    }, [router])

    useEffect(() => {
        if (userNick !== "") {
            connectRoom();
            // 서버로부터 새로운 메시지를 받았을 때
            socket.on('chatMessage', (message) => {
                setMessages((prevMessages) => [...prevMessages, message]);
            });

            // 컴포넌트 언마운트 시에 소켓 연결을 해제합니다.
            return () => {
                const data = {
                    roomNo: roomNo,
                    userNick: userNick
                };
                socket.emit('leaveRoom', data)
            };
        }
    }, [userNick])

    useEffect(() => {
        // 서버로부터 방 접속자 목록을 받아올 때
        socket.on('roomUsers', (users) => {
            setRoomUsers(users);
        });
        console.log(roomUsers)
        messageContainerRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [messages]);

    const connectRoom = () => {
        if (roomNo) {
            const data = {
                roomNo: roomNo,
                userNick: userNick
            }
            socket.emit('joinRoom', data);
        }
    }

    const handleSendMessage = () => {
        if (messageInput === "") return;
        const messageText = ` : ${messageInput}`
        const data = {
            room: roomNo,
            message: messageText,
            userNick: userNick
        };
        socket.emit('newMessage', data);
        setMessageInput('');
    };
    const onKeyPress = (e: React.KeyboardEvent) => {
        if (e.key == 'Enter') {
            handleSendMessage();
        }
    }

    return (
        <div>
            <div className={styles.userListWrapper}>
                <div>접속자 목록</div>
                <ul className={styles.userListUL}>
                    {roomUsers.map((user, index) => (
                        <li key={index}>{user}</li>
                    ))}
                </ul>
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