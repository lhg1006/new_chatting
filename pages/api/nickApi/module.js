import pool from "/db";

export const deleteNick = async (nickname) =>{
    const connection = await pool.getConnection();
    const deleteResult = await connection.query('DELETE FROM new_chatting.nickname WHERE nickname = (?) LIMIT 1', [nickname]);
    connection.release();

    return deleteResult[0].affectedRows;
}

export const updateNickname = async (data) => {
    const {newNick, userId} = data
    const connection = await pool.getConnection();
    const insertResult = await connection.query('UPDATE new_chatting.users SET nickname = (?) WHERE user_id = (?)', [newNick, userId]);
    connection.release();

    return insertResult[0].affectedRows;
}

export const nicknameList = async () => {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT nickname FROM new_chatting.nickname');
    connection.release();

    return  rows.map(row => row.nickname);
}

export const nickDuplicateCheck = async (nick) => {
    const connection = await pool.getConnection();
    const nickDuplicateCheckResult = await connection.query('SELECT COUNT(*) as cnt FROM new_chatting.users WHERE nickname = (?)', [nick])
    connection.release();
    const { cnt } = nickDuplicateCheckResult[0][0]
    return cnt !== 0;
}