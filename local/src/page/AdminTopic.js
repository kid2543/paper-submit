import axios from 'axios'
import React, { useEffect, useState } from 'react'

const api = process.env.REACT_APP_API_URL

function AdminTopic() {

    const [topic, setTopic] = useState([])

    const fethTopic = async () => {
        try {
            const res = await axios.get(api + "/all/topic")
            setTopic(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (e.target.name.value !== "" && e.target.name.value !== undefined) {
            try {
                const createTopic = await axios.post(api + "/create/topic", {
                    name: e.target.name.value
                })
                alert("สร้างหัวข้อสำเร็จ" + createTopic.status)
            } catch (error) {
                console.log(error)
            } finally {
                fethTopic()
            }
        } else {
            alert("กรุณากรอกข้อมูล")
            return false
        }
    }

    const handleDel = async (topic_id) => {
        if (window.confirm("ต้องการจะลบจริงหรือไม่?")) {
            try {
                await axios.delete(api + "/delete/topic/" + topic_id)
                alert("ลบหัวข้อสำเร็จ")
            } catch (error) {
                console.log(error)
                alert("เกิดข้อผิดพลาด")
            } finally {
                fethTopic()
            }
        }
    }

    useEffect(() => {
        fethTopic()
    }, [])

    return (
        <div className='container py-5'>
            <h4 className='fw-bold mb-3'>รายชื่อหัวข้อทั้งหมด</h4>
            <form onSubmit={handleSubmit} className='col-12 col-md-6 col-lg-4 mb-5'>
                <label className='form-label text-muted'>ชื่อหัวข้อ</label>
                <div className='input-group'>
                    <input name='name' className='form-control' placeholder='กรอกชื่อหัวข้อ' />
                    <button type='submit' className='btn btn-primary'>เพิ่ม</button>
                </div>
            </form>
            <ul className='list-group'>
                {topic?.map((item) => (
                    <li className='list-group-item d-flex justify-content-between' key={item._id}>
                        <div>
                            {item.name}
                        </div>
                        <div>
                            <button type='button' onClick={() => handleDel(item._id)} className='btn btn-outline-danger border-0'>Del</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AdminTopic