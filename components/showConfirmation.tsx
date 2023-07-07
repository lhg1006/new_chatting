import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';



export const showConfirmation = ({
    title = "Confirm", message = "",
    lBtnText = "취소", rBtnText = "확인",
    onCancel = ()=>{}, onConfirm = ()=>{}} : {
    title:string; message:string;
    lBtnText:string; rBtnText:string;
    onCancel: () => void; onConfirm: () => void;}) => {
    confirmAlert({
        title: title,
        message: message,
        buttons: [
            {
                label: rBtnText,
                onClick: () => {
                    onConfirm()
                },
            },
            {
                label: lBtnText,
                onClick: () => {
                    onCancel()
                },
            },
        ],
    });
}


