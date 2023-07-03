import {Dropdown} from "react-bootstrap";
import {FcComments} from "react-icons/fc";
import styles from '@/styles/header.module.css';
import {useRouter} from "next/router";
import NickModal from "@/components/nickModal";
import {useState} from "react";
import {toast} from "react-toastify";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const router = useRouter()
    const headerIco = () => router.push('/chat/list');
    const openNickModal = () => {
        setIsOpen(!isOpen)
    }
    const delNick = () => {
        localStorage.removeItem("user_nick_name")
        toast("닉네임 삭제 성공")
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
            <NickModal isOpen={isOpen}/>
        </>
    )
}
export default Header;