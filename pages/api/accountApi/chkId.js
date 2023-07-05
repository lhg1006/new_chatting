import {idDuplicateCheck} from "./module";

export default async function handler(req, res) {
    const { data } = req.body;
    console.log(data);
    const resData = {
        res: false,
        message: "[실패] : 이미 있는 아이디",
    };

    try {
        const response = await idDuplicateCheck(data);
        const result = response.data;

        if (+result === 1) {
            resData.res = true;
            resData.message = "[성공] : 사용 가능";
        }

        res.status(200).json(resData);
    } catch (error) {
        console.error("Error occurred during ID check:", error);
        res.status(500).json({ message: "서버 오류" });
    }
}