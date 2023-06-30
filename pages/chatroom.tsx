import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import styles from '../styles/chat.module.css';

const socket = io('http://61.80.148.189:3001'); // 채팅 서버 URL

const ChatRoom = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState('');

    // 서버로부터 메시지를 수신할 때 실행되는 이벤트 핸들러
    useEffect(() => {
        socket.on('message', (message: string) => {
            setMessages((prevMessages: string[]) => [...prevMessages, message]);
        });
    }, []);

    // 입력된 메시지를 서버로 전송하는 함수
    const sendMessage = () => {
        socket.emit('message', newMessage);
        setNewMessage('');
    };

    return (
        <div className={styles.chatContainer}>
            <h1 className={styles.title}>Chat Room</h1>
            <h3>( 밑에 send : 일단 제 터미널로 와요 ㄱㄱ 테스트 )</h3>
            <div className={styles.messageContainer}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.message}>{message}</div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className={styles.inputField}
                />
                <button onClick={sendMessage} className={styles.sendButton}>Send</button>
            </div>
        </div>
    );
};

export default ChatRoom;