import React, {useState} from "react";
import style from '@/styles/login.module.css'
import axios from "axios";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {setCookie} from "@/utils/cookieUtil";

const Login = () => {
    const router = useRouter()
    const [id, setId] = useState<string>('')
    const [pw, setPw] = useState<string>('')

    const idHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value)
    }
    const pwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value)
    }
    const loginButton = async () => {
        const data = {id,pw}
        const ok = await axios.post(`/api/accountApi/login`, {data})
        if(ok.data.res == 1){
            await setCookie({cName : 'userId' , cValue: ok.data.userId})
            await setCookie({cName : 'userNick' , cValue: ok.data.userNick})
            await router.push('/chat/list')
            toast(`${ok.data.message}`)
        }else{
            toast(`${ok.data.message}`)
        }
    }
    const signInButton = async () => router.push('/account/signIn')
    return (
        <>
            <div className={style.header}>로그인</div>
            <div className={style.inputBoxWrap}>
                <label htmlFor="inputFieldId">아이디</label>
                <input type={'text'} value={id} id={'inputFieldId'} onChange={idHandler} placeholder={'아이디 입력'}/>
                <label htmlFor="inputFieldPw">비밀번호</label>
                <input type={'password'} value={pw} id={'inputFieldPw'} onChange={pwHandler} placeholder={'비밀번호 입력'}/>
            </div>
            <div className={style.buttonWrap}>
                <a onClick={loginButton}>
                    <span>Log In</span>
                </a>
                <a onClick={signInButton}>
                    <span>Sign In</span>
                </a>
            </div>
        </>
    )
}
export default Login;