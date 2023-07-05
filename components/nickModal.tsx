import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

import React, {Dispatch, useState} from "react";
import {toast} from "react-toastify";


const NickModal = ({isOpen, setIsOpen}: { isOpen: boolean; setIsOpen: Dispatch<any> }) => {
    const [nickname, setNickname] = useState('');
    const [error, setError] = useState('');

    const handleClose = () => setIsOpen(false);
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const saveChanges = async () => {
        const result = await axios.post(`/api/nickApi/set`, {nickname: nickname})
        console.log(result)
        if (nickname === "") {
            return;
        }
        if (nickname.length > 6) {
            toast.error("최대 6글자 !!!")
            return;
        }
        if(result.data.res == 1){
            // 닉네임 저장 성공
            localStorage.setItem('user_nick_name', nickname);
            toast(`${result.data.message}${nickname}`)
            handleClose();
            setNickname("")
        }else{
            toast(`${result.data.message}${nickname}`)
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
                        Close
                    </Button>
                    <Button variant="primary" onClick={saveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default NickModal;