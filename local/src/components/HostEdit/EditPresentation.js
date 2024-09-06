import React from 'react'

function EditPresentation({ addItem, handleChange, handleDel, presenter, chair, audience }) {

    return (
        <div className='mb-5'>
            <div className='mb-3'>
                <h4 className='text-primary'>ข้อแนะนำ</h4>
                <hr />
            </div>
            <div className='mb-5'>
                <div className='mb-3'>
                    <h6>สำหรับผู้นำเสนอ</h6>
                    <button type='button' onClick={() => addItem(1)} className='btn btn-primary btn-sm'>Add +</button>
                </div>
                <ol>
                    {presenter?.map((item, index) => {
                        return (
                            <li key={index} className='mb-3'>
                                <textarea onChange={e => handleChange(index, e, 1)} className='form-control' defaultValue={item} />
                                <div className='w-100 text-end mt-2'>
                                    <button type='button' onClick={() => handleDel(index, 1)} className='btn text-danger'>ลบ</button>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className='mb-5'>
                <div className='mb-3'>
                    <h6>สำหรับ sesstion chair</h6>
                    <button type='button' onClick={() => addItem(2)} className='btn btn-primary btn-sm'>Add +</button>
                </div>
                <ol>
                    {chair?.map((item, index) => {
                        return (
                            <li key={index} className='mb-3'>
                                <textarea onChange={e => handleChange(index, e, 2)} className='form-control' defaultValue={item} />
                                    <div className='w-100 text-end mt-2'>
                                        <button type='button' onClick={() => handleDel(index, 2)} className='btn text-danger'>ลบ</button>
                                    </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
            <div className='mb-5'>
                <div className='mb-3'>
                    <h6>สำหรับ audience</h6>
                    <button type='button' onClick={() => addItem(3)} className='btn btn-primary btn-sm'>Add +</button>
                </div>
                <ol>
                    {audience?.map((item, index) => {
                        return (
                            <li key={index} className='mb-3'>
                                <textarea onChange={e => handleChange(index, e, 3)} className='form-control' defaultValue={item} />
                                    <div className='w-100 text-end mt-2'>
                                        <button type='button' onClick={() => handleDel(index, 3)} className='btn text-danger'>ลบ</button>
                                    </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}

export default EditPresentation