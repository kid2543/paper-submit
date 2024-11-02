import axios from 'axios';
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const api = process.env.REACT_APP_API_URL

function EditCateModal({ code, icon, name, cate_id, desc }) {

    const [show, setShow] = useState(false);
    const [uploadIcon, setUploadIcon] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleUpdate = async (e) => {
        e.preventDefault()
        if (uploadIcon) {
            const formData = new FormData(e.target)
            formData.append("image", uploadIcon)
            try {
                const uploadCate = await axios.patch(api + `/update/cate/${cate_id}/${icon}`, formData)
                console.log(uploadCate)
            } catch (error) {
                console.log(error)
            }
        } else {
            const input = e.target
            try {
                const update = await axios.patch(api + `/update/cate/${cate_id}/${icon}`,{
                    name: input.name.value,
                    desc: input.desc.value,
                    cate_code: input.cate_code.value,
                })
                console.log(update)
            } catch (error) {
                console.log(error)
            }
        }

    }

    return (
        <>
            <Button className='me-2' variant="outline-primary" onClick={handleShow}>
                แก้ไข
            </Button>

            <Modal show={show} onHide={handleClose}>
                <form onSubmit={handleUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>ข้อมูลหัวข้องานประชุม</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>รหัสหัวข้อ</label>
                            <input name='cate_code' className='form-control' defaultValue={code} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>ชื่อหัวข้อ</label>
                            <input name='name' className='form-control' defaultValue={name} />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>รายละเอียด</label>
                            <textarea name='desc' className='form-control' defaultValue={desc} />
                        </div>
                        <div className='mb-3'>
                            <div className='mb-3'>
                                <img src={api + "/image/" + icon} height={24} width={24} />
                            </div>
                            <label className='form-label text-muted'>icon</label>
                            <input onChange={e => setUploadIcon(e.target.files[0])} type='file' className='form-control' />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type='submit'>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    )
}

export default EditCateModal