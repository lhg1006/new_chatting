import pool from "/db";

export const deleteNick = async (nickname) =>{
    const connection = await pool.getConnection();
    const deleteResult = await connection.query('DELETE FROM next_chatting.nickname WHERE nickname = (?) LIMIT 1', [nickname]);
    connection.release();

    return deleteResult[0].affectedRows;
}

export const nicknameInsert = async (nickname) => {
    const connection = await pool.getConnection();
    const insertResult = await connection.query('INSERT INTO next_chatting.nickname (nickname) VALUES (?)', [nickname]);
    connection.release();

    return insertResult;
}

export const nicknameList = async () => {
    const connection = await pool.getConnection();
    const [rows, fields] = await connection.query('SELECT nickname FROM next_chatting.nickname');
    connection.release();

    return  rows.map(row => row.nickname);
}

export const nickDuplicateCheck = async (nick) => {
    const connection = await pool.getConnection();
    const nickDuplicateCheckResult = await connection.query('SELECT COUNT(*) as cnt FROM next_chatting.nickname WHERE nickname = (?)', [nick])
    connection.release();

    return nickDuplicateCheckResult[0][0].cnt;
}