import {accountCheck, userInfo} from "./module";

export default async function handler(req, res) {
    const {data} = req.body
    const param = {
        id : data.id,
        pw : data.pw
    }
    const resData = {
        res : 0,
        userId : '',
        userNick : '',
        message : "[실패] : ERROR"
    }
    const isVerified = await accountCheck(param)
    if ( isVerified === 1 ) {
        const user = await userInfo(param.id)
        resData.res = 1;
        resData.message = "[성공] : 인증"
        resData.userId = user?.userId;
        resData.userNick = user?.userNick;

    } else {
        resData.res = -1; resData.message = "[실패] : 없거나 잘못된 정보"
    }
    res.status(200).json(resData);
}