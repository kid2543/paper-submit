import React from 'react';

import {
    Modal,
    Button
} from 'react-bootstrap';

const ConfirmDeleteDialog = ({ show, message, header, onConfirm, onCancel }) => {
    if (!show) {
        return null;
    }

    return (
        <Modal show={show} onHide={onCancel}>
            <Modal.Body className='text-center'>
                <div className='p-3'>
                    <i className="text-danger fs-1 bi bi-exclamation-triangle-fill"></i>
                </div>
                <h4 className='fw-bold'>{header}</h4>
                <p>
                    {message}
                </p>
                <div>
                    <Button className='col-6' variant="" onClick={onCancel}>
                        ยกเลิก
                    </Button>
                    <Button className='col-6' variant="danger" onClick={onConfirm}>
                        ยืนยัน
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default ConfirmDeleteDialog;
