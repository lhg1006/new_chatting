import {createPool} from "mysql2/promise";

const pool = createPool({
    host: 'limepiece.com', // MySQL 호스트 이름
    port: 12675,
    user: 'root', // MySQL 사용자 이름
    password: '1234', // MySQL 비밀번호
    database: 'next_chatting', // MySQL 데이터베이스 이름
    connectionLimit: 10, // 커넥션 풀의 최대 연결 수 (선택적)
});

export default pool;