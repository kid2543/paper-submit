import React from 'react'

function EditRegisType({ data, handleChange, handleDel, addItem }) {
    return (
        <div className='mb-5'>
            <div className='mb-3'>
                <h4 className='fw-bold'>อัตราค่าลงทะเบียน</h4>
            </div>
            <div className='mb-5'>
                <button onClick={addItem} type='button' className='btn btn-outline-primary btn-sm'>Add +</button>
            </div>
            <div className='row g-3'>
                {data?.map((item, index) => {
                    return (
                        <div className='col-md-6 col-lg-4' key={index}>
                            <div className='card p-3'>
                                <div>
                                    <p className='text-success'>รายการที่ {index + 1}</p>
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label text-muted'>ประเภทการลงทะเบียน</label>
                                    <input type='text' name='name' onChange={e => handleChange(index, e)} className='form-control' defaultValue={item.name} />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label text-muted'>Early Bird Registation</label>
                                    <input name='price_1' onChange={e => handleChange(index, e)} className='form-control' defaultValue={item.price_1} />
                                </div>
                                <div className='mb-3'>
                                    <label className='form-label text-muted'>Regular Registation</label>
                                    <input name='price_2' onChange={e => handleChange(index, e)} className='form-control' defaultValue={item.price_2} />
                                </div>
                                <div className='text-end'>
                                    <button type='button' onClick={() => handleDel(index)} className='btn text-danger'><ion-icon name="trash-outline"></ion-icon> Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EditRegisType