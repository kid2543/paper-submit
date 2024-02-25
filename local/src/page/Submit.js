import React from 'react'

function Submit() {
    return (
        <div className='my-4 container'>
            <form>
                <h2 className='text-center'>แบบฟอร์มการส่งบทความ</h2>
                <div className='form-group'>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='ชื่อ-นามสกุล' />
                        <label className='form-label text-muted'>ชื่อ-นามสกุล</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='ตำแหน่งทางวิชาการ (ถ้ามี)' />
                        <label className='form-label text-muted' >ตำแหน่งทางวิชาการ (ถ้ามี)</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='ตำแหน่งบริหาร (ถ้ามี)' />
                        <label className='form-label text-muted'>ตำแหน่งบริหาร (ถ้ามี)</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='อาจารย์ประจำสาขาวิชา/กลุ่มวิชา/ภาควิชา' />
                        <label className='form-label text-muted'>อาจารย์ประจำสาขาวิชา/กลุ่มวิชา/ภาควิชา</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='คณะ' />
                        <label className='form-label text-muted' >คณะ</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='มหาวิทยาลัย' />
                        <label className='form-label text-muted'>มหาวิทยาลัย</label>
                    </div>
                    <h2 className='text-center'>กรณีผู้เขียนบทความเป็นนักวิจัยอิสระ นักวิชาการอิสระ หรืออื่นๆ โปรดระบุข้อมูล</h2>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='ตำแหน่ง' />
                        <label className='form-label text-muted'>ตำแหน่ง</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='หน่วยงานที่สังกัด' />
                        <label className='form-label text-muted'>หน่วยงานที่สังกัด</label>
                    </div>
                </div>

                <h2 className='text-center'>รายละเอียดบทความ</h2>
                <div className='form-group'>
                    <div className='form-floating mb-3'>
                        <select className='form-select' id='confrCdoe'>
                            <option>
                                -- เลือกงานประชุม
                            </option>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                        </select>
                        <label className='form-label text-muted' htmlFor='confrCdoe'>รหัสงานประชุม</label>
                    </div>
                    <div className='form-floating'>
                        <select className='form-select'>
                            <option>
                                -- โปรดเลือกประเภทบทความ
                            </option>
                            <option>
                                1
                            </option>
                            <option>
                                2
                            </option>
                            <option>
                                3
                            </option>
                        </select>
                        <label className='form-label text-muted'>ประเภทบทความ</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='ชื่อบทความ (ภาษาไทย)' />
                        <label className='form-label text-muted'>ชื่อบทความ (ภาษาไทย)</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='ชื่อบทความ (ภาษาอังกฤษ)' />
                        <label className='form-label text-muted'>ชื่อบทความ (ภาษาอังกฤษ)</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control mb-0' type='text' placeholder='คำสำคัญ (ภาษาไทย)' />
                        <label className='form-label text-muted'>คำสำคัญ (ภาษาไทย)</label>
                        <div className='form-text'>ไม่เกิน 5 คำ</div>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control mb-0' type='text' placeholder='Keyword (ภาษาอังกฤษ)' />
                        <label className='form-label text-muted'>Keyword (ภาษาอังกฤษ)</label>
                        <div className='form-text'>ความหมายเดียวกันกับคำสำคัญภาษาไทย</div>
                    </div>
                    <div className='form-floating'>
                        <textarea className='form-control mb-0' placeholder='ชื่อผู้เขียน (ภาษาไทย)' style={{ height: "100px" }} />
                        <label className='form-label text-muted'>ชื่อผู้เขียน (ภาษาไทย)</label>
                        <div className='form-text'>ระบุชื่อผู้เขียนบทความทุกท่าน</div>
                    </div>
                    <div className='form-floating'>
                        <textarea className='form-control mb-0' placeholder='ชื่อผู้เขียน (ภาษาอังกฤษ)' />
                        <label className='form-label text-muted'>ชื่อผู้เขียน (ภาษาอังกฤษ)</label>
                        <div className='form-text'>ระบุชื่อผู้เขียนบทความทุกท่าน</div>
                    </div>
                    <div className='form-floating'>
                        <textarea className='form-control' placeholder='ที่อยู่ในการติดต่อ' />
                        <label className='form-label text-muted'>ที่อยู่ในการติดต่อ</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='เบอร์โทรศัพท์' />
                        <label className='form-label text-muted'>เบอร์โทรศัพท์</label>
                    </div>
                    <div className='form-floating'>
                        <input className='form-control' type='text' placeholder='E-mail' />
                        <label className='form-label text-muted'>E-mail</label>
                    </div>

                    <label className='mb-2'>แนบไฟล์เอกสาร</label>
                    <input className='form-control mt-0' type='file' placeholder='แนบไฟล์เอกสาร' />

                    <p className='text-center text-muted'>
                        ข้าพเจ้าขอรับรองว่า บทความนี้ไม่เคยลงตีพิมพ์ที่ใดมาก่อน ไม่อยู่ระหว่างการเสนอเพื่อพิจารณาตีพิมพ์ในวารสารหรือสิ่งพิมพ์อื่น นับจากวันที่ข้าพเจ้าได้ส่งบทความฉบับนี้มายังกองบรรณาธิการ
                        วารสารวิชาการนั้นๆ และข้าพเจ้า (และคณะ) เป็นผู้เขียนบทความจริง
                    </p>
                </div>
                <div className='text-center my-4'>
                    <button type='submit' className='btn btn-primary'>ส่งบทความ</button>
                </div>
            </form>
        </div>
    )
}

export default Submit