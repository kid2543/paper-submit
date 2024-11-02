import React from 'react'
import useFetch from './hook/useFetch'

function EditCommitteeList() {

    const comitList = useFetch("/all/committee")
    const reviewList = useFetch("/all/assign")

    const getAmout = (id) => {
        let arr = [...reviewList.data]
        arr = arr.filter((item) => item.reviewer === id)
        return arr.length
    }

    return (
        <div>
            <div className='card'>
                <div className='card-body py-4'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h3>รายชื่อกรรมการ</h3>
                        </div>
                        <div>
                            <button className='btn btn-primary'>+ New</button>
                        </div>
                    </div>
                            <hr />
                            <div className='my-3'>
                                <input type='search' className='form-control' placeholder='search...' />
                            </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ชื่อ</th>
                                <th>ชื่อผู้ใช้</th>
                                <th>จำนวนบทความ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {comitList.data?.map((items) => (
                                <tr key={items._id}>
                                    <td>
                                        {items.fname} {items.lname}
                                    </td>
                                    <td>
                                        {items.username}
                                    </td>
                                    <td>
                                        {getAmout(items._id)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default EditCommitteeList