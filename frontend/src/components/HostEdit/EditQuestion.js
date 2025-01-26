import axios from 'axios'
import React, { useEffect, useState } from 'react'


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
            alert('Success')
        } catch (error) {
            console.log(error)
            alert('Error')
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
        <div className='py-5'>
            <div className='mb-4'>
                <h4 className='fw-bold'>แบบประเมิน</h4>
                <p className='text-muted'>เพิ่มแบบประเมินและแก้ไขเพื่อให้กรรมการอ่านและให้คะแนนได้ถูกต้อง</p>
            </div>
            <div className='card border-0 shadow-sm'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center mb-4'>
                        <h6 className='fw-bold mb-0'>รายการคำถาม</h6>
                        <div>
                            <button onClick={handleAdd} type='button' className='btn btn-primary btn-sm'>
                                <span className='me-2'>
                                    <i className='bi bi-plus-lg'></i>
                                </span>
                                เพิ่มแบบประเมิน
                            </button>
                        </div>
                    </div>
                    {question && (
                        <div className='table-responsive' style={{ minHeight: "480px" }}>
                            <div className='mb-3'>
                                <button type='button' onClick={handleUpdate} className='btn btn-success text-white'>
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
                                        <th>เครื่องมือ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {question.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td>
                                                <textarea key={key} defaultValue={item} onChange={e => handleChange(e, index)} className='form-control' />
                                            </td>
                                            <td>
                                                <button className='btn btn-danger' type='button' onClick={() => handleDel(index)}>
                                                    <i className='bi bi-trash'></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div >
                    )
                    }
                </div>
            </div>
        </div >
    )
}

export default EditQuestion