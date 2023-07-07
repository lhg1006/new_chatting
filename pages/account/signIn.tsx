import React, {KeyboardEventHandler, useRef, useState} from "react";
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
    const [pwError, setPwError] = React.useState(false);
    const [chkNick, setChkNick] = useState<boolean>(false);
    const idInputRef = useRef<HTMLInputElement>(null);

    //Set State Value
    const idHandler = (e :React.ChangeEvent<HTMLInputElement>) => {
        setChkId(false);
        setId(e.target.value)
    }
    const pwHandler = (e :React.ChangeEvent<HTMLInputElement>) => {
        setPw(e.target.value)
    }
    const nickHandler = (e :React.ChangeEvent<HTMLInputElement>) => {
        setChkNick(false);
        setNick(e.target.value)
    }
    // Check Value
    const idChkHandler = async () => {
        if(id.length < 3){
            idInputFocus()
            return toast("아이디 3글자 이상 입력하삼")
        }
        const regExp = /[ㄱ-ㅎㅏ]/g;
        if(regExp.test(id)){
            idInputFocus()
            return toast("한글은 올바르게 입력하삼")
        }
        const available = await axios.get(`/api/accountApi/chkId?id=${id}`)
        if(available.data.res){
            setChkId(true)
        }else{
            setChkId(false)
        }
        toast(`${available.data.message}`)
    }
    const idInputFocus = () => {
        if (idInputRef.current !== null) {
            idInputRef.current.focus();
        }
    }
    const onPwKeyUp : KeyboardEventHandler<HTMLInputElement> = () => {
        if (pw.length > 3) {
            setPwError(false);
        } else {
            setPwError(true);
        }
    }
    const nickChkHandler = async () => {
        if(nick.length < 2){
            return toast("닉네임은 두글자 2상 2삼")
        }
        const available = await axios.get(`/api/accountApi/chkNick?nick=${nick}`)
        if(available.data.res){
            setChkNick(true)
        }else{
            setChkNick(false)
        }
        toast(`${available.data.message}`)
    }
    // Submit
    const signInButton = async () => {
        if(id == "" || pw == "" || nick == ""){
            return toast("입력값을 확인하삼")
        }
        if(!chkId){
            return toast("아이디 중복확인하삼")
        }
        if(pwError){
            return toast("비번 제대로 ㄱ")
        }
        if(!chkNick){
            return toast("닉네임 중복확인하삼")
        }
        const data = {id, pw, nick}
        try {
            const signIns = await axios.post('/api/accountApi/signIn', { data });
            if (signIns.data.res === 1) {
                await router.replace('/account/login');
            }
            toast(`${signIns.data.message}`);
        } catch (error) {
            console.error('Sign in failed:', error);
        }
    }

    return(
        <>
            <div className={style.header}>회원가입</div>
            <div className={style.inputBoxWrap}>
                <label htmlFor={"idInput"}>아이디</label>
                <input required ref={idInputRef} id={"idInput"} value={id} type={"text"} onChange={idHandler}/>
                <div className={`${style.duplicateBtnWrap} ${chkId ? style.available : ''}`} onClick={idChkHandler}>
                    <a>
                        <span>아이디 중복확인</span>
                    </a>
                </div>
                <label htmlFor={"pwInput"}>비밀번호</label>
                <input required id={"pwInput"} value={pw} type={"password"} onKeyUp={onPwKeyUp} onChange={pwHandler}/>
                {pwError && <div className={style.errorMessage}>비밀번호 4자리 이상</div>}
                <label htmlFor={"nickInput"}>닉네임</label>
                <input required id={"nickInput"} value={nick} type={"text"} onChange={nickHandler}/>
                <div className={`${style.duplicateBtnWrap} ${chkNick ? style.available : ''}`} onClick={nickChkHandler}>
                    <a>
                        <span>닉네임 중복확인</span>
                    </a>
                </div>
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