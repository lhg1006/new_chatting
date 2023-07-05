import {accountIns} from "./module";

export default async function handler(req, res) {
    const {data} = req.body
    const param = {
        id : data.id,
        pw : data.pw,
        nick : data.nick
    }
    const resData = {
        res : 0,
        message : "[실패] : ERROR"
    }
    const ins = await accountIns(param)
    if(+ins === 1){
        resData.res = ins.data;
        resData.message = "[성공] : 로그인으로 이동"
    }

    res.status(200).json(resData);
}