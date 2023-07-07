import styles from '@/styles/footer.module.css'
import {FiArrowLeft} from "react-icons/fi";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {delCookie, getCookie} from "@/module/cookieUtil";
import {showConfirmation} from "@/components/showConfirmation";
import {useEffect, useState} from "react";

const Footer = () => {
    const router = useRouter()
    const cookieId = getCookie('userId')
    const cookieNick = getCookie('userNick')
    const [isLogin, setIsLogin] = useState<boolean>(false)

    useEffect(()=>{
        if(cookieId != null || cookieNick != null){
            setIsLogin(true)
        }else{
            setIsLogin(false)
        }
    },[])

    const backIco = () => router.back();
    const login = () => {
        if (isLogin) {
            showConfirmation({
                title: "로그아웃 ???", message: "",
                lBtnText: "아니", rBtnText: "응",
                onCancel(): void {
                    return;
                }, onConfirm(): void {
                    delCookie()
                    router.push('/account/login')
                    toast("[성공] : 로그아웃")
                }
            })
        }else{
            router.push('/account/login')
        }
    }

    const myChat = () => toast('미구현')
    const footerTwo = () => toast('미구현')


    return (
        <div className={`${styles.footer}`}>
            <div className={"text-center mb-1"} onClick={backIco}><FiArrowLeft/> 뒤로</div>
            <div className={"text-center mb-1"} onClick={login}> { isLogin ? '로그아웃' : '로그인' }</div>
            <div className={"text-center mb-1"} onClick={myChat}>내채팅</div>
            <div className={"text-center mb-1"} onClick={footerTwo}>즐겨찾기</div>
        </div>
    )
}
export default Footer;