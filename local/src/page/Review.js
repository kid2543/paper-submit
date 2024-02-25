import React from 'react'
import { useNavigate } from 'react-router-dom'

function Review() {

    const navigate = useNavigate()
    return (
        <div className='container my-4'>
            <h2 className='text-center'>Form สำหรับการตรวจบทความ</h2>
            <form>
                <h3 className='mt-3'>ขอบเขต</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' name='scope' />
                    <label className='form-check-label'>บทความไม่เคยถูกเผยแพร่มาก่อน</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' name='scope' />
                    <label className='form-check-label'>บทความสามารถปรับปรุงได้</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' name='scope' />
                    <label className='form-check-label'>บทความคล้ายกับบทความก่อนๆ ที่เคยเผยแพร่มาก่อน</label>
                </div>
                <h3 className='mt-3'>วิธีการและทฤษฎี</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ไม่มีการลอกเลียนแบบ</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ค่อนข้างคล้ายกับบทความอื่น ที่มีการอ้างอิงที่เหมาะสม</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>มีความคล้ายกับบทความอื่นก่อนหน้านี้</label>
                </div>
                <h3 className='mt-3'>หัวข้อบทความ</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>สอดคล้องกับเนื้อหา</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ไม่สอดคล้องกับเนื้อหา</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ข้อแนะนำ</label>
                    <textarea className='form-control' placeholder='ข้อแนะนำ' />
                </div>
                <h3 className='mt-3'>บทคัดย่อ</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>สอดคล้องกับเนื้อหา</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ไม่สอดคล้องกับเนื้อหา</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ข้อแนะนำ</label>
                    <textarea className='form-control' placeholder='ข้อแนะนำ' />
                </div>
                <h3 className='mt-3'>ทฤษฎี และ งานวิจัยที่เกี่ยวข้อง</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ถูกต้อง</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>จำเป็นต้องพิสูจน์</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ข้อแนะนำ</label>
                    <textarea className='form-control' placeholder='ข้อแนะนำ' />
                </div>
                <h3 className='mt-3'>สิ่งที่ค้นพบ</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>เหมาะกับวัตถุประสงค์</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ไม่เหมาะกับวัตถุประสงค์</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ข้อแนะนำ</label>
                    <textarea className='form-control' placeholder='ข้อแนะนำ' />
                </div>
                <h3 className='mt-3'>การอภิปราย</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ชัดเจน</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ยังไม่ชัดเจน</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ข้อแนะนำ</label>
                    <textarea className='form-control' placeholder='ข้อแนะนำ' />
                </div>
                <h3 className='mt-3'>บทสรุป</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ชัดเจน</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ไม่ชัดเจน</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ข้อแนะนำ</label>
                    <textarea className='form-control' placeholder='ข้อแนะนำ' />
                </div>
                <h3 className='mt-3'>ภาพรวมทั้งหมด</h3>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ผ่าน</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>มีการแก้ไขน้อย (ผ่าน)</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>แก้ไขค่อนข้างเยอะ (ส่งใหม่)</label>
                </div>
                <div className='form-check'>
                    <input className='form-check-input' type='radio' />
                    <label className='form-check-label'>ไม่ผ่าน</label>
                </div>
                <h3 className='mt-3'>ข้อแนะนำต่อผู้แต่ง</h3>
                <textarea className='form-control' placeholder='ข้อแนะนำ' />
                <h3 className='mt-3'>หรือ Upload ข้อแนะนำในรูปแบบ file</h3>
                <input className='form-control' type='file' />
                <div className='mt-3'>
                    <button className='btn btn-success me-4'>Submit</button>
                    <button className='btn btn-secondary' onClick={() => navigate(-1)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}

export default Review