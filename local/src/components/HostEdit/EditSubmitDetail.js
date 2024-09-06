import React from 'react'

function EditSubmitDetail({addItem, submit, handleChange, handleDel}) {
    return (
        <div className='mb-5'>
            <div className='mb-3'>
                <h4 className='text-primary'>ข้อแนะนำการส่งบทความ</h4>
                <hr />
            </div>
            <div className='mb-5'>
                <div className='mb-3'>
                    <button type='button' onClick={() => addItem(1)} className='btn btn-primary btn-sm'>Add +</button>
                </div>
                <ol>
                    {submit?.map((item, index) => {
                        return (
                            <li key={index} className='mb-3'>
                                <textarea onChange={e => handleChange(index, e, 1)} className='form-control' defaultValue={item} />
                                <div className='text-end'>
                                    <button type='button' onClick={() => handleDel(index)} className='btn text-danger'>ลบ</button>
                                </div>
                            </li>
                        )
                    })}

                </ol>
            </div>
        </div>
    )
}

export default EditSubmitDetail