import pool from "/db";

export const idDuplicateCheck = async (id) => {
    const connection = await pool.getConnection();
    const idDuplicateCheckResult = await connection.query('SELECT COUNT(*) as cnt FROM next_chatting.users WHERE user_id = (?)', [id])
    connection.release();

    return idDuplicateCheckResult[0][0].cnt;
}

export const accountCheck = async (data) =>{
    const connection = await pool.getConnection();
    const {id, pw} = data;
    const accountCheckResult = await connection.query('SELECT COUNT(*) as cnt FROM next_chatting.users WHERE user_id = (?) AND user_pw = (?)', [id, pw]);
    connection.release();

    return accountCheckResult[0][0].cnt;
}

export const accountIns = async (data) => {
    const connection = await pool.getConnection();
    const {id, pw, nick} = data;
    const accountInsResult = await connection.query('INSERT INTO next_chatting.users (user_id, user_pw, nickname) VALUES(?,?,?)',[id, pw, nick]);
    connection.release();

    return accountInsResult[0].affectedRows;
}

export const userInfo = async (data) => {
    const connection = await pool.getConnection();
    const accountInsResult = await connection.query('SELECT user_id as userId , nickname as userNick FROM next_chatting.users WHERE user_id = (?)',[data]);
    connection.release();
    return accountInsResult[0][0];
}