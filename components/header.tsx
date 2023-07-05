import {Dropdown} from "react-bootstrap";
import {FcComments} from "react-icons/fc";
import styles from '@/styles/header.module.css';
import {useRouter} from "next/router";
import NickModal from "@/components/nickModal";
import {useState} from "react";
import {toast} from "react-toastify";
import axios from "axios";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const router = useRouter()
    const headerIco = () => router.push('/chat/list');
    const openNickModal = () => {
        setIsOpen(true)
    }
    const delNick = async () => {
        const nickname = localStorage.getItem("user_nick_name")
        const result = await axios.post(`/api/nickApi/del`, {nickname: nickname})
        console.log(result)
        if(result.data.res == 1){
            localStorage.removeItem("user_nick_name")
            toast("[성공] : 닉네임 삭제 완료")
        }else{
            toast("[실패] : ERROR")
        }
    }
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.item1} ${styles.headerIco}`} onClick={headerIco}><FcComments/></div>
                <div className={`${styles.item2}`}> title</div>
                <div className={styles.item3}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Menu
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={openNickModal}>닉네임 설정</Dropdown.Item>
                            <Dropdown.Item onClick={delNick}>닉네임 삭제</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <NickModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    )
}
export default Header;