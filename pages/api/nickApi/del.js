import {deleteNick} from "./module";

export default async function handler(req, res) {
    const {nickname} = req.body
    console.log(nickname)
    const data = {
        res: await deleteNick(nickname),
        message: `성공`,
    };
    res.status(200).json(data);
}
