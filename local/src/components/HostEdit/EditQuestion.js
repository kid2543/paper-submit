import axios from 'axios'
import React, { useEffect, useState } from 'react'

const api = process.env.REACT_APP_API_URL

function EditQuestion({ id }) {

    const [q, setQ] = useState([])
    const [text, setText] = useState("")
    const [editText, setEditText] = useState("")
    const [editIndex, setEditIndex] = useState(null)

    const fethQna = async () => {
        try {
            const res = await axios.get(api + "/get/question/" + id)
            setQ(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAdd = (e) => {
        e.preventDefault()
        if (text) {
            setQ([...q, text])
            setText("")
            e.target.question.value = ""
        } else {
            alert("กรุณากรอกคำถาม")
        }
    }

    const handleSave = async () => {
        try {
            const update = await axios.patch(api + "/update/conferences/" + id, {
                question: q
            })
            console.log(update)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDel = (index) => {
        setQ(q.filter((item, idx) => idx !== index))
    }

    const handleEdit = (index) => {
        setQ((prev) => {
            const update = [...prev]
            update[index] = editText
            return update
        })
        setEditIndex(null)
    }

    const updateEditStatus = (index, text) => {
        setEditIndex(index)
        setEditText(text)
    } 


    useEffect(() => {
        fethQna()
    }, [])

    return (
        <div className='mb-5'>
            <form onSubmit={handleAdd} className='mb-3'>
                <label className='form-label text-muted'>คำถาม</label>
                <div className='mb-3 input-group'>
                    <input name='question' onChange={e => setText(e.target.value)} className='form-control' />
                    <button type='submit' className='btn btn-primary'>Add +</button>
                </div>
            </form>
            <h4 className='mt-5'>รายการคำถาม</h4>
            <hr />
            <div className='table-responsive'>
                {q.length === 0 ? "ยังไม่มีรายการคำถาม" : (
                    <table className='table table-hover'>
                        <thead className='table-primary'>
                            <tr>
                                <th>อันดับ</th>
                                <th>คำถาม</th>
                                <th>tools</th>
                            </tr>
                        </thead>
                        <tbody>
                            {q?.map((item, index) => (
                                <tr key={index}>
                                    {editIndex === index ? (
                                        <>
                                            <td>{index + 1}</td>
                                            <td>
                                                <input onChange={e => setEditText(e.target.value)} defaultValue={item} className='form-control' />
                                            </td>
                                            <td>
                                                <button className='btn text-success' type='button' onClick={() => handleEdit(index)}><ion-icon name="save"></ion-icon></button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{index + 1}</td>
                                            <td>{item}</td>
                                            <td>
                                                <button className='btn text-secondary' type='button' onClick={() => updateEditStatus(index, item)}><ion-icon name="create"></ion-icon></button>
                                                <button type='button' onClick={() => handleDel(index)} className="btn text-danger"><ion-icon name="trash-bin"></ion-icon></button>
                                            </td>
                                        </>
                                    )}

                                </tr>
                            ))}
                        </tbody>
                    </table>
                )
                }
                <div>
                    <button type='button' onClick={handleSave} className='btn btn-success'>Save</button>
                </div>
            </div >
        </div >
    )
}

export default EditQuestion