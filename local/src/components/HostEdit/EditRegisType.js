import React from 'react'

function EditRegisType({ data, handleChange, handleDel, addItem }) {
    return (
        <div className='mb-5'>
            <div className='mb-3'>
                <h4 className='text-primary'>อัตราค่าลงทะเบียน</h4>
                <hr />
            </div>
            <div className='mb-5'>
                <button onClick={addItem} type='button' className='btn btn-primary'>Add +</button>
            </div>
            <div>
                {data?.map((item, index) => {
                    return (
                        <div className='row mb-3' key={index}>
                            <div>
                                <p className='text-success'>รายการที่ {index + 1}</p>
                            </div>
                            <div className='col-12 col-md-12 col-lg-4 mb-3'>
                                <label className='form-label text-muted'>ประเภทการลงทะเบียน</label>
                                <input type='text' name='name' onChange={e => handleChange(index, e)} className='form-control' defaultValue={item.name} />
                            </div>
                            <div className='col-12 col-md-6 col-lg-4 mb-3'>
                                <label className='form-label text-muted'>Early Bird Registation</label>
                                <input name='price_1' onChange={e => handleChange(index, e)} className='form-control' defaultValue={item.price_1} />
                            </div>
                            <div className='col-12 col-md-6 col-lg-4 mb-3'>
                                <label className='form-label text-muted'>Regular Registation</label>
                                <input name='price_2' onChange={e => handleChange(index, e)} className='form-control' defaultValue={item.price_2} />
                            </div>
                            <div className='col-12 text-end'>
                                <button type='button' onClick={() => handleDel(index)} className='btn text-danger'>ลบ</button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EditRegisType