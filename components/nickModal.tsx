import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";


const NickModal = ({isOpen}: { isOpen: boolean }) => {
    const [show, setShow] = useState<boolean>(false);
    const [nickname, setNickname] = useState('');

    useEffect(() => {
        setShow(!show)
    },[isOpen])
    const handleClose = () => setShow(false);

    const saveChanges = () => {
        if(nickname === ""){
            return;
        }
        // 로컬 스토리지에 닉네임 저장
        localStorage.setItem('user_nick_name', nickname);
        toast(`닉네임 등록 성공 : ${nickname}`)
        handleClose();
        setNickname("")
    }
    const handleInputChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
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