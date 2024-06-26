import {idDuplicateCheck} from "./module";

export default async function handler(req, res) {
    const { id } = req.query;
    const resData = {
        res: false,
        message: "[실패] : 이미 있는 아이디",
    };

    try {
        if(id != null){
            const response = await idDuplicateCheck(id);
            if (response === 0) {
                resData.res = true;
                resData.message = "[성공] : 사용 가능";
            }
        }
        res.status(200).json(resData);
    } catch (error) {
        console.error("Error occurred during ID check:", error);
        res.status(500).json({ message: "서버 오류" });
    }
}