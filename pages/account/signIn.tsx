import React, {useState} from "react";
import style from "@/styles/login.module.css";
import axios from "axios";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
const SignIn = () => {
    const router = useRouter()

    const [id, setId] = useState<string>('')
    const [pw, setPw] = useState<string>('')
    const [nick, setNick] = useState<string>('')
    const [chkId, setChkId] = useState<boolean>(false);

    const signInButton = async () => {
        const data = {id, pw, nick}
        const signIns = await axios.post(`/api/accountApi/signIn`, {data})
        if(signIns.data.res === 1){
            toast(`${signIns.data.message}`)
            router.replace('/account/login')
        }else{
            toast(`${signIns.data.message}`)
        }
    }
    const idHandler = (e :React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
    }
    const pwHandler = (e :React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value)
    }
    const nickHandler = (e :React.ChangeEvent<HTMLInputElement>) => {
        setNick(e.target.value)
    }
    const idChkHandler = async () => {
        const available = await axios.get(`/api/accountApi/chkId?id=${id}`)
        if(available.data.res){
            setChkId(true)
        }else{
            setChkId(false)
        }
        toast(`${available.data.message}`)
    }

    return(
        <>
            <div className={style.header}>회원가입</div>
            <div className={style.inputBoxWrap}>
                <label htmlFor={"idInput"}>아이디</label>
                <input id={"idInput"} value={id} type={"text"} onChange={idHandler}/>
                <div className={`${style.duplicateBtnWrap} ${chkId ? style.available : ''}`}>
                    <a onClick={idChkHandler}>
                        <span>중복확인</span>
                    </a>
                </div>
                <label htmlFor={"pwInput"}>비밀번호</label>
                <input id={"pwInput"} value={pw} type={"password"} onChange={pwHandler}/>
                <label htmlFor={"nickInput"}>닉네임</label>
                <input id={"nickInput"} value={nick} type={"text"} onChange={nickHandler}/>
            </div>
            <div className={style.buttonWrap}>
                <a onClick={signInButton}>
                    <span>회원가입</span>
                </a>
            </div>
        </>
    )
}
export default SignIn;