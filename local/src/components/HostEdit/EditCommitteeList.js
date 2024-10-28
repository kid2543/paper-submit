import React from 'react'

const list = [
    {
        id: 0,
        name: "comit 1",
        university: "RMUTL",
    },
    {
        id: 1,
        name: "comit 2",
        university: "RMUTL",
    },
    {
        id: 2,
        name: "comit 3",
        university: "RMUTL",
    },
    {
        id: 3,
        name: "comit 4",
        university: "RMUTL",
    },
    {
        id: 4,
        name: "comit 5",
        university: "RMUTL",
    },
]

function EditCommitteeList() {
    return (
        <div>
            <div className='card'>
                <div className='card-body py-4'>
                    <div>
                        <h3>รายชื่อกรรมการ</h3>
                        <hr />
                    </div>
                    {list.map((items) => (
                        <div key={items.university}>
                            <div className='d-flex justify-content-between mb-3'>
                                <div>
                                    {items.name}
                                </div>
                                <div>
                                    {items.university}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default EditCommitteeList