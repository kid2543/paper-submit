import axios from 'axios'
import React, { useState } from 'react'

const api = process.env.REACT_APP_API_URL

function EditCommitteeList({ data, setData, id }) {

    const [committeeValue, setCommitteeValue] = useState({
        name: "",
        belong_to: "",
        position: "",
    })

    const addCommittee = (e) => {
        e.preventDefault()
        if (committeeValue.name !== "" && committeeValue.belong_to !== "" && committeeValue.position !== "") {
            setData([...data, committeeValue])
            setCommitteeValue({
                name: "",
                belong_to: "",
                position: "",
            })
            e.target.name.value = ""
            e.target.belong_to.value = ""
            e.target.position.value = ""
        } else {
            alert("ข้อมูลไม่ครบ")
            return false
        }

    }

    const committeeListUpdate = async () => {
        try {
            const update = await axios.patch(api + "/update/conferences/" + id, {
                committees: data
            })
            alert("อัพเดทข้อมูลสำเร็จ: " + update.status)
        } catch (error) {
            console.log(error)
            alert("เกิดข้อผิดพลาด")
        }
    }

    const delCommittees = (idx) => {
        setData(data.filter((item,index) => index !== idx))
    }

    return (
        <div>
            <form onSubmit={addCommittee} className='row mb-3'>
                <div className='col-12 col-md-4'>
                    <label className='form-label text-muted'>
                        ชื่อกรรมการ
                    </label>
                    <input name='name' onChange={e => setCommitteeValue({ ...committeeValue, name: e.target.value })} className='form-control' />
                </div>
                <div className='col-12 col-md-4'>
                    <label className='form-label text-muted'>
                        สังกัด/มหาวิทยาลัย
                    </label>
                    <input name='belong_to' onChange={e => setCommitteeValue({ ...committeeValue, belong_to: e.target.value })} className='form-control' />
                </div>
                <div className='col-12 col-md-4'>
                    <label className='form-label text-muted'>
                        ตำแหน่ง
                    </label>
                    <input name='position' onChange={e => setCommitteeValue({ ...committeeValue, position: e.target.value })} className='form-control' />
                </div>
                <div className='mt-3'>
                    <button className='btn btn-primary' type='submit'>Add</button>
                </div>
            </form>
            <table className="table">
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>สังกัด/มหาวิทยาลัย</th>
                        <th>ตำแหน่ง</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((item,index) => (
                        <tr key={index}>
                            <td>
                                {item.name}
                            </td>
                            <td>{item.belong_to}</td>
                            <td>{item.position}</td>
                            <td>
                                <button className='btn text-danger' type='button' onClick={() => delCommittees(index)}>Del</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                <button className='btn btn-success' type='button' onClick={committeeListUpdate}>Save</button>
            </div>
        </div>
    )
}

export default EditCommitteeList