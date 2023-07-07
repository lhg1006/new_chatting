import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

import React, {Dispatch, useState} from "react";
import {toast} from "react-toastify";
import {getCookie, updCookie} from "@/module/cookieUtil";


const NickModal = ({isOpen, setIsOpen}: { isOpen: boolean; setIsOpen: Dispatch<any> }) => {
    const [nickname, setNickname] = useState('');

    const handleClose = () => setIsOpen(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const saveChanges = async () => {
        if (nickname === "") {
            return;
        }
        if (nickname.length > 6) {
            toast.error("최대 6글자 !!!")
            return;
        }

        const param = {
            newNick: nickname,
            userId: getCookie('userId')
        }

        const result = await axios.post(`/api/nickApi/set`, {param})

        if(result.data.res == 1){
            await updCookie({cName:'userNick', cValue:param.newNick})
            // 닉네임 저장 성공
            toast(`${result.data.message}`)
            handleClose();
            setNickname("")
        }else{
            toast(`${result.data.message}`)
        }
    }

    return (
        <>
            <Modal show={isOpen} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>새로운 닉네임을 입력해주세요.</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup size="lg">
                        <InputGroup.Text id="inputGroup-sizing-lg">닉네임</InputGroup.Text>
                        <Form.Control
                            aria-label="newNick"
                            aria-describedby="inputGroup-sizing-sm"
                            value={nickname}
                            onChange={handleInputChange}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        닫기
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        바꾸기
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default NickModal;