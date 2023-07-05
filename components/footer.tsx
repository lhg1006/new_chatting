import styles from '@/styles/footer.module.css'
import {FiArrowLeft} from "react-icons/fi";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
const Footer = () => {
    const router = useRouter()
    const backIco = () => router.back();
    const login = () => router.push('/account/login')
    const myChat = () => toast('미구현')
    const footerTwo = () => toast('미구현')

    
    return(
        <div className={`${styles.footer}`}>
            <div className={"text-center mb-1"} onClick={backIco}><FiArrowLeft/> 뒤로</div>
            <div className={"text-center mb-1"} onClick={login}>로그인</div>
            <div className={"text-center mb-1"} onClick={myChat}>내채팅</div>
            <div className={"text-center mb-1"} onClick={footerTwo}>즐겨찾기</div>
        </div>
    )
}
export default Footer;