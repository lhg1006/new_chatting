import {Dropdown} from "react-bootstrap";
import {FcComments} from "react-icons/fc";
import styles from '@/styles/header.module.css';
import {useRouter} from "next/router";
import NickModal from "@/components/nickModal";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {delCookie} from "@/utils/cookieUtil";

const Header = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [hide, setHide] = useState<boolean>(false)
    const router = useRouter()
    const { asPath } = router;
    const headerIco = () => router.push('/chat/list');
    const openNickModal = () => {
        setIsOpen(true)
    }
    const logoutHandler = async () => {
        delCookie();
        await router.push('/account/login')
        toast("[성공] : 로그아웃")
    }

    useEffect(()=> {
        if(asPath.includes('/chat/room')){
            setHide(true)
        }else{
            setHide(false)
        }
    },[asPath])
    return (
        <>
            <div className={`${styles.container}`}>
                <div className={`${styles.item1} ${styles.headerIco}`} onClick={headerIco}><FcComments/></div>
                <div className={`${styles.item2}`}> </div>
                <div className={styles.item3}>
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Menu
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={`${styles.dropDownItemBox}`}>
                            {!hide && <Dropdown.Item className={`${styles.dropDownItem}`} onClick={openNickModal}>닉네임 변경</Dropdown.Item>}
                            <Dropdown.Item onClick={logoutHandler}>로그아웃</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>
            <NickModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </>
    )
}
export default Header;