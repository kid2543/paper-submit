import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const api = process.env.REACT_APP_API_URL

function EditTemplate({id}) {

    const [templateUpload, setTemplateUpload] = useState(null)
    const [templateData, setTemplateData] = useState([])

    const fethTemplate = async () => {
        try {
            const res = await axios.get(api + "/get/template/" + id)
            setTemplateData(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTemplate = async (templateId, filename) => {
        if (window.confirm("ต้องการจะลบหรือไม่ ?")) {
            try {
                const res = await axios.delete(api + "/delete/template/" + templateId + "/" + filename)
                console.log(res)
                alert("ลบสำเร็จ")
            } catch (error) {
                console.log(error)
            } finally {
                setTemplateData(templateData.filter((item) => item._id !== templateId))
            }
        }
    }

    const uploadTemplate = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("name", e.target.name.value)
            formData.append("file", templateUpload)
            formData.append("confr_id", id)
            const res = await axios.post(api + "/upload/template/" + id, formData)
            alert("อัพโหลดข้อมูลสำเร็จ")
            setTemplateData([...templateData, res.data])
            console.log(res)
        } catch (error) {
            console.log(error)
        } finally {
            e.target.name.value = ""
            e.target.file.value = null
        }
    }

    useEffect(() => {
        fethTemplate()
    }, [])

    return (
        <div className='mb-3'>
            <div className='mb-5'>
                <h4 className='text-primary'>อัพโหลด Template </h4>
                <hr />
            </div>
            <form onSubmit={uploadTemplate}>
                <div className='row'>
                    <div className='col-12 col-md-6 mb-3'>
                        <label className='form-label text-muted'>ชื่อไฟล์</label>
                        <input name='name' className='form-control' required />
                    </div>
                    <div className='col-12 col-md-6 mb-3'>
                        <label className='form-label text-muted'>เลือกไฟล์</label>
                        <input name='file' accept='application/pdf' type='file' className='form-control' onChange={e => setTemplateUpload(e.target.files[0])} required />
                    </div>
                </div>

                <button type='submit' className='btn btn-primary'>Upload template</button>
            </form>
            <div>
                {templateData ? (
                    <div className='row my-3'>
                        {templateData?.map((item) => (
                            <div key={item._id} className='col-12 col-md-4 border rounded p-3 text-center position-relative'>
                                <NavLink to={api + "/pdf/" + item.file} target='_blank'><span className='me-2'><ion-icon name="document-text"></ion-icon></span> {item.name}</NavLink>
                                <button type='button' onClick={() => deleteTemplate(item._id, item.file)} className='btn position-absolute top-0 start-100 translate-middle badge btn-danger'>ลบ</button>
                            </div>
                        ))}
                    </div>
                ) : <p>กรุณาอัพโหลดข้อมูล</p>}
            </div>
        </div>
    )
}

export default EditTemplate