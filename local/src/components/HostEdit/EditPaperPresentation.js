import React from 'react'

function EditPaperPresentation({ data, remark, addItem, handleChange, handleDel, handleRemark }) {

    return (
        <div className='mb-5'>
            <div className="mb-3">
                <h4 className='text-primary'>แนวทางการนำเสนอบทความ</h4>
                <hr />
            </div>
            <div className='mb-5'>
                <button type='button' onClick={addItem} className='btn btn-primary'>Add +</button>
            </div>
            <div>
                <h6 className='mb-3'>รายการแนวทางการนำเสนอ</h6>
                    {data.length > 0 ? (
                        <ol>
                            {data.map((item,index) => {
                                return (
                                        <li key={index} className='mb-3'>
                                            <textarea className='form-control' defaultValue={item} onChange={e => handleChange(index, e)} />
                                            <div className='text-end'>
                                                <button onClick={() => handleDel(index)} type='button' className='btn text-danger mt-2'>ลบ</button>
                                            </div>
                                        </li>
                                )
                            })}
                        </ol>
                    ) : (
                        <p>ยังไม่มีรายการ</p>
                    )}
            </div>
            <div>
                <label className='form-label text-muted'>รายละเอียดเพิ่มเติม</label>
                <textarea name='presentation_remark' onChange={e => handleRemark(e)} className='form-control' defaultValue={remark} />
            </div>
        </div>
    )
}

export default EditPaperPresentation