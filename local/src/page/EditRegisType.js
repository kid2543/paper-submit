import axios from 'axios';
import React, { useEffect, useState } from 'react'

function EditRegisType({id,api,data}) {

    const [regisType, setRegisType] = useState([]);

    useEffect(() => {
        setRegisType(data)
    },[data])

    const addItem = (e) => {
        e.preventDefault();
        const formText = document.getElementById('text')
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries())
        setRegisType([...regisType, formJson])
        alert("เพิ่มข้อมูลสำเร็จ")
        formText.value = ''
    }

    const handleDel = (index) => {
        setRegisType(regisType.filter((item, idx) => index !== idx))
    }

    const handleUpdate = async () => {
        try {
            let res = await axios.patch(`${api}/update/conferences/${id}/regis-type`,regisType)
            alert("อัพเเดทข้อมูลสำเร็จ: " + res.status)
        } catch (error) {
            console.log(error)
            alert("ไม่สามารถบันทึกข้อมูลได้: " + error.message)
        }
    }

    return (
        <div className='my-5'>
            <h4 className='text-center'>ประเภทการลงทะเบียน</h4>
            <form onSubmit={addItem}>
                <div className='form-floating'>
                    <input id="text" name='name' type='text' placeholder='ชื่อประเภท' className='form-control' />
                    <label className='form-label text-muted'>ชื่อประเภท</label>
                </div>
                <div className='form-floating'>
                    <input name='price_1' type='number' autocomplete="off" placeholder='ค่าใช้จ่ายรูปแบบ Early Bird' className='form-control' />
                    <label className='form-label text-muted'>ค่าใช้จ่ายรูปแบบ Early Bird</label>
                </div>
                <div className='form-floating'>
                    <input name='price_2' type='number' autocomplete="off" placeholder='ค่าใช้จ่ายรูปแบบ Regular' className='form-control' />
                    <label className='form-label text-muted'>ค่าใช้จ่ายรูปแบบ Regular</label>
                    <button type='submit' className='btn btn-primary me-2'>เพิ่ม</button>
                    <button type='button' onClick={handleUpdate} className='btn btn-outline-success'>บันทึก</button>
                </div>
            </form>
            <ul className='list-group mt-3'>
                <li className='list-group-item list-group-item-dark'>รายการทั้งหมด</li>
                {regisType?.map((item, index) => (
                    <li key={index} className='list-group-item d-flex justify-content-between align-items-center'>
                       <span> ชื่อ: {item.name}<br/>
                        Early Bird: {item.price_1} <br/>
                        Regular: {item.price_2}
                        </span>
                        <button onClick={() => handleDel(index)} className='btn btn-danger'>ลบ</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default EditRegisType