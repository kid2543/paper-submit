import axios from 'axios';
import React, { useEffect, useState } from 'react'



function EditPresenter({ remark, detail, present, sessionChair, audience,api,id }) {

    const [text, setText] = useState('');
    const [formRemark, setFormRemark] = useState('');
    const [formDetail, setFormDetail] = useState([]);
    const [formPresent, setFormPresent] = useState([]);
    const [formChair, setFormChair] = useState([]);
    const [formAudience, setFormAudience] = useState([]);

    useEffect(() => {
        setFormDetail(detail)
        setFormPresent(present)
        setFormChair(sessionChair)
        setFormAudience(audience)
        setFormRemark(remark)
    }, [detail])

    const handleDel = (index, setItem, item) => {
        setItem(item.filter((item, idx) => index !== idx))
    }

    const addItem = (setItem, item, text,form) => {
        const textarea = document.getElementById(form)
        setItem([...item, text])
        setText('');
        textarea.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.patch(`${api}/update/conferences/${id}/present`,{
                remark: formRemark,
                detail: formDetail,
                present: formPresent,
                chair: formChair,
                audience: formAudience,
            })
            alert("อัพเดทข้อมูลแล้ว:" + res.status)
        } catch (error) {
            console.log(error)
            alert("Error: ไม่สามารถอัพเดทข้อมูลได้: " + error.status)
        }
    }


    return (
        <div className='my-5'>
            <h4 className='text-center mt-3'>รายละเอียดข้อแนะนำต่างๆ </h4>
            <form onSubmit={handleSubmit} >
                <div className='form-floating'>
                    <input onChange={e => setFormRemark(e.target.value)} defaultValue={formRemark} type='text' placeholder='Remark' className='form-control' />
                    <label className='form-label text-muted'>Remark</label>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-floating'>
                            <textarea id="detail" style={{ height: 100 }} onChange={e => setText(e.target.value)} placeholder='สำหรับผู้ส่งบทความ' className='form-control' />
                            <label className='form-label text-muted'>สำหรับผู้ส่งบทความ</label>
                            <button type='button' onClick={() => addItem(setFormDetail, formDetail, text, "detail")} className='btn btn-outline-success'>เพิ่มคำแนะนำ</button>
                        </div>
                    </div>
                    <div className='col'>
                        <ul className='list-group mt-3'>
                            <li className='list-group-item list-group-item-dark'>ข้อแนะนำสำหรับการส่งบทความ</li>
                            {formDetail?.map((item, index) => (
                                <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                                    {item}
                                    <button type='button' className='btn btn-outline-danger' onClick={() => handleDel(index, setFormDetail, formDetail)}>Del</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-floating'>
                            <textarea id="present" style={{ height: 100 }} onChange={e => setText(e.target.value)} placeholder='สำหรับผู้นำเสนอ' className='form-control' />
                            <label className='form-label text-muted'>สำหรับผู้นำเสนอ</label>
                            <button type='button' onClick={() => addItem(setFormPresent, formPresent, text ,"present")} className='btn btn-outline-success'>เพิ่มคำแนะนำ</button>
                        </div>
                    </div>
                    <div className='col'>
                        <ul className='list-group mt-3'>
                            <li className='list-group-item list-group-item-dark'>ข้อแนะนำสำหรับ ผู้นำเสนอ</li>
                            {formPresent?.map((item, index) => (
                                <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                                    {item}
                                    <button type='button' className='btn btn-outline-danger' onClick={() => handleDel(index, setFormPresent, formPresent)}>Del</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-floating'>
                            <textarea id="chair" style={{height:100}} onChange={e => setText(e.target.value)} name='chair' type='text' placeholder='สำหรับกรรมการ' className='form-control' />
                            <label className='form-label text-muted'>สำหรับกรรมการ</label>
                            <button type='button' onClick={() => addItem(setFormChair, formChair, text, "chair")} className='btn btn-outline-success'>เพิ่มคำแนะนำ</button>
                        </div>
                    </div>
                    <div className='col'>
                        <ul className='list-group mt-3'>
                            <li className='list-group-item list-group-item-dark'>ข้อแนะนำสำหรับ กรรมการ</li>
                            {formChair?.map((item, index) => (
                                <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                                    {item}
                                    <button type='button' className='btn btn-outline-danger' onClick={() => handleDel(index, setFormChair, formChair)}>Del</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='row'>
                    <div className='col'>
                        <div className='form-floating'>
                            <textarea id="audience" onChange={e => setText(e.target.value)} style={{height:100}} placeholder='สำหรับผู้ชม' className='form-control' />
                            <label className='form-label text-muted'>สำหรับผู้ชม</label>
                            <button type='button' onClick={() => addItem(setFormAudience, formAudience, text,"audience")} className='btn btn-outline-success'>เพิ่มคำแนะนำ</button>
                        </div>
                    </div>
                    <div className='col'>
                        <ul className='list-group mt-3'>
                            <li className='list-group-item list-group-item-dark'>ข้อแนะนำสำหรับ ผู้ชม</li>
                            {formAudience?.map((item, index) => (
                                <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                                    {item}
                                    <button type='button' className='btn btn-outline-danger' onClick={() => handleDel(index, setFormAudience, formAudience)}>Del</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>


                <button type='submit' className='btn btn-primary my-5'>Save</button>


            </form>
        </div>

    )
}

export default EditPresenter