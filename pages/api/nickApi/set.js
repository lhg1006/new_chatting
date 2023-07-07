import {nickDuplicateCheck, updateNickname} from "./module";
export default async function handler(req, res) {
    const {newNick, userId} = req.body.param
    const data = {
        res: 0,
        message: `Error`,
    };
    const isDuplicate = await nickDuplicateCheck(newNick)
    if (!isDuplicate) {
        const param = {
            newNick, userId
        }
        data.res = await updateNickname(param);
        data.message = `[성공] 내 닉네임 : ${newNick}`;
        res.status(200).json(data);
    } else {
        data.res = -1;
        data.message = `[실패] 닉네임 중복 : ${newNick}`;
        res.status(200).json(data);
    }
}