import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


function EditQuestion() {

    const id = sessionStorage.getItem('host_confr')

    // question value
    const [question, setQuestion] = useState([])
    const [loading, setLoading] = useState('idle')
    const [error, setError] = useState('')

    const [key, setKey] = useState(0)

    useEffect(() => {
        setLoading('loading')
        const fetchQuestion = async () => {
            try {
                const res = await axios.get('/api/conference/host/' + id)
                setQuestion(res.data.question)
            } catch (error) {
                setError(error)
                console.log(error)
            }
        }
        fetchQuestion()
        setLoading('success')
    }, [id])

    const handleChange = (e, index) => {
        const { value } = e.target
        let temp = [...question]
        temp[index] = value
        setQuestion(temp)
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.patch('/api/conference/', {
                _id: id,
                question
            })
            setQuestion(res.data.question)
            toast.success('Success')
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        }
    }

    const handleAdd = () => {
        setQuestion([...question, ""])
    }

    const handleDel = (index) => {
        setQuestion(question.filter((items, idx) => idx !== index))
        setKey(key + 1)
    }

    if (loading === 'idle' || loading === 'loading') {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Error</div>
    }

    return (
        <div>
            <div className='mb-3 card'>
                <div className='card-body'>
                    <h4 className='fw-bold card-title'>แบบประเมิน</h4>
                    <p className='text-muted card-text'>เพิ่มแบบประเมินและแก้ไขเพื่อให้กรรมการอ่านและให้คะแนนได้ถูกต้อง</p>
                </div>
            </div>
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div>
                        <h4>รายการคำถาม</h4>
                    </div>
                    {question && (
                        <form onSubmit={handleUpdate}>
                            <div className='table-responsive' style={{ minHeight: "480px" }}>
                                <div className='mb-3'>
                                    <button type='submit' className='btn btn-success text-white'>
                                        <span className='me-2'>
                                            <i className='bi bi-floppy'></i>
                                        </span>
                                        บันทึก
                                    </button>
                                </div>
                                <table className='table table-hover h-100'>
                                    <thead>
                                        <tr>
                                            <th>ลำดับ</th>
                                            <th>คำถาม</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {question.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {index + 1}
                                                </td>
                                                <td>
                                                    <div className="input-group">
                                                        <textarea
                                                            key={key}
                                                            defaultValue={item}
                                                            onChange={e => handleChange(e, index)}
                                                            className='form-control'
                                                            required
                                                            rows={3}
                                                        />
                                                        <button className='btn btn-outline-danger' type='button' onClick={() => handleDel(index)}>
                                                            <i className='bi bi-trash'></i>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div >
                        </form>
                    )
                    }
                    <div className="text-end">
                        <button onClick={handleAdd} type='button' className='btn btn-primary'>
                            <span className='me-2'>
                                <i className='bi bi-plus-lg'></i>
                            </span>
                            เพิ่มแบบประเมิน
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default EditQuestion