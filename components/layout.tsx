import React, {JSX} from "react";
import styles from "@/styles/layout.module.css";
import {ToastContainer} from "react-toastify";

const Layout = ({children}: { children: JSX.Element }) => {
    return (
        <>
            <div className={styles.layout}>
                <ToastContainer position="top-center" //위치
                                autoClose={1500} // 자동 off 시간
                                hideProgressBar={false} // 진행시간바 숨김
                                closeOnClick // 클릭으로 알람 닫기
                                rtl={false} // 알림 좌우 반전
                                pauseOnFocusLoss // 화면을 벗어나면 알람 정지
                                draggable // 드래그 가능
                                pauseOnHover // 마우스를 올리면 알람 정지
                                theme="light"
                />
                {children}
            </div>
        </>
    )
}
export default Layout;