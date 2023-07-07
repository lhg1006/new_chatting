import {nickDuplicateCheck} from "../nickApi/module";

export default async function handler(req, res) {
    const { nick } = req.query;
    const resData = {
        res: false,
        message: "[실패] : 이미 있는 닉네임",
    };

    try {
        if(nick != null){
            const isDuplicate = await nickDuplicateCheck(nick);
            if (!isDuplicate) {
                resData.res = !isDuplicate;
                resData.message = "[성공] : 사용 가능";
            }
        }
        res.status(200).json(resData);
    } catch (error) {
        console.error("Error occurred during ID check:", error);
        res.status(500).json({ message: "서버 오류" });
    }
}