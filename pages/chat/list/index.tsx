import {useRouter} from "next/router";
import styles from '@/styles/roomList.module.css';
import {toast} from "react-toastify";

const RoomList = () => {
    const router = useRouter();
    const roomClick = (no: number)=> {
        const userName = localStorage.getItem("user_nick_name");
        if(userName === null){
            toast.warning("[필수] 상단 메뉴 닉네임 등록!!!")
        }else{
            goChat(no);
        }
    }

    const goChat = (no: number) => router.push(`/chat/room/${no}`);

    return(
        <>
            <div className={styles.roomListContainer}>
                <h2>ROOM LIST</h2>
                <ul className={styles.roomList}>
                    <li onClick={() => roomClick(1)}>room 1</li>
                    <li onClick={() => roomClick(2)}>room 2</li>
                    <li onClick={() => roomClick(3)}>room 3</li>
                    <li onClick={() => roomClick(4)}>room 4</li>
                    <li onClick={() => roomClick(5)}>room 5</li>
                </ul>
            </div>
        </>
    )
}
export default RoomList;