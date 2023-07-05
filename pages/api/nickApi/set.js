import {nicknameInsert, nicknameList} from "./module";

export default async function handler(req, res) {
    const {nickname} = req.body
    const data = {
        res: 0,
        message: `Error`,
    };
    if (await chkNickDuplicate(nickname)) {
        data.res = await insertNickname(nickname);
        data.message = "[성공] 내 닉네임 : ";
        res.status(200).json(data);
    } else {
        data.res = -1;
        data.message = "[실패] 닉네임 중복 : ";
        res.status(200).json(data);
    }
}

const chkNickDuplicate = async (nick) =>{
    const list = await nicknameList();
    const isDuplicate = list.includes(nick)
    return !isDuplicate
}

async function insertNickname(nickname) {
    try {
        const response = await nicknameInsert(nickname);
        return response[0].affectedRows;
    } catch (error) {
        console.error('Error inserting nickname:', error);
    }
}