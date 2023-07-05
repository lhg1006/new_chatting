import {accountCheck} from "./module";

export default async function handler(req, res) {
    const {data} = req.body
    const param = {
        id : data.id,
        pw : data.pw
    }
    const resData = {
        res : 0,
        message : "[실패] : ERROR"
    }
    const isVerified = await accountCheck(param)
    console.log(isVerified)
    if ( isVerified === 1 ) {
        resData.res = 1; resData.message = "[성공] : 인증"
    } else {
        resData.res = -1; resData.message = "[실패] : 없거나 잘못된 정보"
    }
    res.status(200).json(resData);
}