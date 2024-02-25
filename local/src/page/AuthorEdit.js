import React from 'react'

function AuthorEdit() {
  return (
    <div className='container-fluid my-4'>
        <form>
            <h2>แก้ไขบทความ: ชื่อบทความ</h2>
            <input className='form-control' type='text' placeholder='ชื่อ-นามสกุล' />
            <input className='form-control' type='text' placeholder='ตำแหน่งทางวิชาการ (ถ้ามี)' />
            <input className='form-control' type='text' placeholder='ตำแหน่งบริหาร (ถ้ามี)' />
            <input className='form-control' type='text' placeholder='อาจารย์ประจำสาขาวิชา/กลุ่มวิชา/ภาควิชา' />
            <input className='form-control' type='text' placeholder='คณะ' />
            <input className='form-control' type='text' placeholder='มหาวิทยาลัย' />
            <h2>กรณีผู้เขียนบทความเป็นนักวิจัยอิสระ นักวิชาการอิสระ หรืออื่นๆ โปรดระบุข้อมูล</h2>
            <input className='form-control' type='text' placeholder='ตำแหน่ง' />
            <input className='form-control' type='text' placeholder='หน่วยงานที่สังกัด' />
            <h2>รายละเอียดบทความ</h2>
            <p>รหัสบทความ : Code</p>
            <select className='form-control'>
                <option>
                    ประเภทบทความ
                </option>
            </select>
            <input className='form-control' type='text' placeholder='ชื่อบทความ (ภาษาไทย)' />
            <input className='form-control' type='text' placeholder='ชื่อบทความ (ภาษาอังกฤษ)' />
            <input className='form-control' type='text' placeholder='คำสำคัญ (ภาษาไทย)' />
            <input className='form-control' type='text' placeholder='คำสำคัญ (ภาษาไทย)' />
            <small className='form-text'>ไม่เกิน 5 คำ</small>
            <input className='form-control' type='text' placeholder='Keyword (ภาษาอังกฤษ)' />
            <small className='form-text'>ความหมายเดียวกันกับคำสำคัญภาษาไทย</small>
            <textarea className='form-control' placeholder='ชื่อผู้เขียน (ภาษาไทย)' />
            <small className='form-text'>ระบุชื่อผู้เขียนบทความทุกท่าน</small>
            <textarea className='form-control' placeholder='ชื่อผู้เขียน (ภาษาอังกฤษ)' />
            <small className='form-text'>ระบุชื่อผู้เขียนบทความทุกท่าน</small>
            <textarea className='form-control' placeholder='ที่อยู่ในการติดต่อ' />
            <input className='form-control' type='text' placeholder='เบอร์โทรศัพท์' />
            <input className='form-control' type='text' placeholder='E-mail' />
            <input className='form-control' type='file' placeholder='แนบไฟล์เอกสาร' />
            <small className='form-text'>
                ข้าพเจ้าขอรับรองว่า บทความนี้ไม่เคยลงตีพิมพ์ที่ใดมาก่อน 
                ไม่อยู่ระหว่างการเสนอเพื่อพิจารณาตีพิมพ์ในวารสารหรือสิ่งพิมพ์อื่น 
                นับจากวันที่ข้าพเจ้าได้ส่งบทความฉบับนี้มายังกองบรรณาธิการ
                วารสารวิชาการนั้นๆ และข้าพเจ้า (และคณะ) เป็นผู้เขียนบทความจริง 
            </small>
            <div className='text-center my-4'>
                <button type='submit' className='btn btn-primary'>แก้ไขบทความ</button>
            </div>
        </form>
    </div>
  )
}

export default AuthorEdit