import Header from "@/components/header";
import Footer from "@/components/footer";
import {useRouter} from "next/router";
import {useEffect} from "react";

const RoomList = () => {
    const router = useRouter();
    const onClick = (no: number)=>router.push(`/chat/room/${no}`);


    return(
        <>
            <Header />
            <div>
                <div> ROOM LIST </div>
                <ul>
                    <li onClick={() => onClick(1)}>room 1</li>
                    <li onClick={() => onClick(2)}>room 2</li>
                    <li onClick={() => onClick(3)}>room 3</li>
                    <li onClick={() => onClick(4)}>room 4</li>
                    <li onClick={() => onClick(5)}>room 5</li>
                </ul>
            </div>
            <Footer />
        </>
    )
}
export default RoomList;