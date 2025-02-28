import React from 'react'

import {
    Modal,
    Button
} from 'react-bootstrap'

function ConfirmDialog(props) {
    return (
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Body className="text-center">
                <i className="bi bi-exclamation-circle text-warning fs-1"></i>
                <h4 className="fw-bold">
                    {props.header}
                </h4>
                <div className='mb-3 text-muted'>
                    {props.text}
                </div>
                <div>
                    <Button
                        variant=''
                        onClick={props.handleClose}
                        className="me-2"
                    >
                        ปิด
                    </Button>
                    {props.loading ? (
                        <button className="btn btn-success" type="button" disabled>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            Loading...
                        </button>
                    ) : (
                        <Button
                            variant='success'
                            onClick={props.handleSubmit}
                        >
                            ยืนยัน
                        </Button>
                    )}
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ConfirmDialog