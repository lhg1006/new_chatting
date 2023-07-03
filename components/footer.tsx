import styles from '@/styles/footer.module.css'
import {FiArrowLeft} from "react-icons/fi";
import {useRouter} from "next/router";
const Footer = () => {
    const router = useRouter()
    const backIco = () => router.push('/chat/list');

    const footerTwo = () => {
        console.log("미구현")
    }

    return(
        <div className={`${styles.footer}`}>
            <div className={"text-center mb-1"} onClick={backIco}><FiArrowLeft/> 뒤로</div>
            <div className={"text-center mb-1"} onClick={footerTwo}>Footer</div>
            <div className={"text-center mb-1"} onClick={footerTwo}>Footer</div>
            <div className={"text-center mb-1"} onClick={footerTwo}>Footer</div>
        </div>
    )
}
export default Footer;