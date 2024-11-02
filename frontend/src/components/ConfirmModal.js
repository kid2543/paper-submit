import React from 'react'
import Modal from 'react-bootstrap/Modal';
import Checked from '../asset/checked.png'
import { useNavigate } from 'react-router-dom';

function ConfirmModal({ show, noReturn, setShow }) {

    const navigate = useNavigate()

    const handleClick = () => navigate(-1)
    const handleClose = () => setShow(false)

    return (
        <Modal show={show}>
            <Modal.Body>
                <div className='text-center'>
                    <div className='pt-5'>
                        <img src={Checked} alt='check' width={64} height={64} />
                    </div>
                    <h2 className='text-success mb-5'>
                        Success!
                    </h2>
                    <div>
                        {noReturn ? (
                            <button type='button' className="btn btn-outline-success" onClick={handleClose}>
                                ยืนยัน
                            </button>
                        ) : (
                            <button type='button' className="btn btn-outline-success" onClick={handleClick}>
                                ยืนยัน
                            </button>
                        )}

                    </div>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default ConfirmModal