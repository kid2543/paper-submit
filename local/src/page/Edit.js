import React from 'react'
import axios from 'axios';

function Edit({data,id,api}) {
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries())
        let res = await axios.patch( api + '/update/conferences/' + id, formJson)
        alert("อัพเดทข้อมูลสำเร็จ: " + res.status)
      } catch (error) {
        console.log(error)
        alert("Error: ไม่สามารถอัพเดทข้อมูลได้: " + error.status)
      }
    }


    return (
        <div className='my-5'>
                <h4 className='text-center'>รายละเอียดทั่วไป</h4>
            <form onSubmit={handleSubmit}>
                <div className='form-floating'>
                    <input name='title' defaultValue={data?.title} type='text' placeholder='ชื่องานประชุม' className='form-control' />
                    <label className='form-label text-muted'>ชื่องานประชุม</label>
                </div>
                <div className='form-floating'>
                    <input name='subtitle' defaultValue={data?.sub_title} type='text' placeholder='รายละเอียดเพิ่มเติม' className='form-control' />
                    <label className='form-label text-muted'>รายละเอียดเพิ่มเติม</label>
                </div>
                <div className='form-floating'> 
                    <textarea style={{height:200}} name='confr_desc' defaultValue={data?.confr_desc} placeholder='เกี่ยวกับงานประชุม' className='form-control' />
                    <label className='form-lebel text-muted'>เกี่ยวกับงานประชุม</label>
                </div>                
                <button type='submit' className='btn btn-primary'>Save</button>
            </form>
        </div>

    )
}

export default Edit