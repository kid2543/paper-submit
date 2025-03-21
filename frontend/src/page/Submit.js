import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UnAuthorized from './UnAuthorized';

function Submit() {

    const id = sessionStorage.getItem('send_paper')
    const [paper, setPaper] = useState([{
        id: 1,
        name: '',
        file: null
    }]);
    const [confr, setConfr] = useState({});
    const [cate, setCate] = useState([]);
    const [pub, setPub] = useState([]);
    const [err, setErr] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const [confirmCheck, setConfirmCheck] = useState(false)
    const [checkError, setCheckError] = useState(false)
    const handleCheck = (e) => {
        const { checked } = e.target
        setConfirmCheck(checked)
        setCheckError(false)
    }

    const handleDelFile = (index) => {
        setPaper(paper.filter((item, idx) => idx !== index))
    }

    const handleForm = async (e) => {
        e.preventDefault()

        // check ว่าทำการกดเครื่องหมายหรือไม่
        if (!confirmCheck) {
            setCheckError(true)
            toast.warning('กรุณายอมรับเงื่อนไขการส่งบทความ')
            return
        }

        // check ว่าทำการแนบไฟล์แล้วหรือยัง
        if (paper.length <= 0) {
            toast.warning('กรุณาเลือกไฟล์')
            return
        }


        const {
            title_en,
            abstract,
            group,
            university,
            cate_paper_code,
            publication,
            title,
            keyword,
            author,
            address,
            contact,
            email,
            regis_type,
        } = e.target
        let cateCode = cate_paper_code.value.split(",")
        const formData = new FormData()
        try {
            if (pub.length > 0) {
                formData.append('publication', publication.value)
            }

            formData.append('abstract', abstract.value)
            formData.append('title_en', title_en.value)
            formData.append('group', group.value)
            formData.append('university', university.value)
            formData.append('title', title.value)
            formData.append('keyword', keyword.value)
            formData.append('author', author.value)
            formData.append('address', address.value)
            formData.append('contact', contact.value)
            formData.append('email', email.value)
            formData.append('regis_type', regis_type.value)
            formData.append('confr_code', id)
            formData.append('cate_code', cateCode[0])
            formData.append('paper_code', `${confr.confr_code}-${cateCode[1]}-`)
            const json = Object.fromEntries(formData.entries())
            const res = await axios.post('/api/paper/create', json)
            for (let i in paper) {
                const formData = new FormData()
                formData.append('paper_id', res.data._id)
                formData.append('file', paper[i].file)
                formData.append('name', paper[i].name)
                await axios.post('/api/paperfile', formData)
            }
            toast.success('ส่งบทความสำเร็จ')
            setTimeout(
                navigate('/setting'), 1000
            )

        } catch (error) {
            toast.error("เกิดข้อผิดพลาด ไม่สามารถส่งบทความได้ กรุณาลองใหม่อีกครั้ง")
            console.log(error)
            setErr(error.response?.data.error)
        }
    }

    const handleChangeFileName = (e, index) => {
        const { value } = e.target
        let temp = [...paper]
        temp[index].name = value
        setPaper(temp)
    }

    const handleChangeFile = (e, index) => {
        let temp = [...paper]
        temp[index].file = e.target.files[0]
        setPaper(temp)
    }

    useEffect(() => {

        const fethConfr = async () => {
            try {
                const res = await axios.get('/api/conference/single/' + id)
                setConfr(res.data)
                const Pub = await axios.get('/api/publication/confr/' + id)
                setPub(Pub.data)
                if (res.data.status) {
                    setIsOpen(true)
                }
            } catch (error) {
                console.log(error)
            }
        }

        const getCateCode = async () => {
            try {
                const res = await axios.get('/api/category/' + id)
                setCate(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethConfr();
        getCateCode();
    }, [id])

    if (!isOpen) {
        return <div>งานประชุมนี้ไม่ได้เปิดให้ส่งบทความ</div>
    }

    if (!id) {
        return (
            <div style={{ padding: '128px 0px' }}>
                <UnAuthorized />
            </div>
        )
    }

    return (
        <div style={{ padding: '128px 0px' }}>
            <div className='bg-dark bg-gradient position-fixed w-100 top-0' style={{ height: "480px", zIndex: -1 }}>
            </div>
            <form className='container my-5' onSubmit={handleForm}>
                <div className='row'>
                    <div className='col-12 col-lg-6'>
                        <h1 className='text-white d-block d-lg-none mb-4'>ส่งบทความ</h1>
                        <div className='card'>
                            <div className='card-body bg-light'>
                                {err &&
                                    <p className='text-danger fw-bold'>{err}</p>
                                }
                                <div className='row gy-3'>
                                    <div>
                                        <label className='form-label'>ชื่อบทความ (ภาษาไทย) <span className="text-danger">*</span></label>
                                        <input
                                            className='form-control'
                                            name='title'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='form-label'>ชื่อบทความ (ภาษาอังกฤษ) <span className="text-danger">*</span></label>
                                        <input
                                            className='form-control'
                                            name='title_en'
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className='form-label'>ชื่อผู้แต่ง <span className="text-danger">*</span></label>
                                        <textarea
                                            className='form-control'
                                            name='author'
                                            required
                                            rows={5}
                                        />
                                        <div className="form-text">
                                            เพิ่มชื่อผู้แต่งโดยการคั่นด้วยเครื่องหมาย , ระหว่างผู้แต่ง เช่น ชื่อ นามสกุล,ชื่อ นามสกุล เป็นต้น <br /> ** ระบุชื่อผู้แต่งทุกท่าน
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label">Abstract <span className="text-danger">*</span></label>
                                        <textarea
                                            className='form-control'
                                            name='abstract'
                                            required
                                            rows={10}
                                        />
                                    </div>
                                    <div>
                                        <label className='form-label'>คำสำคัญ <span className="text-danger">*</span></label>
                                        <textarea
                                            className='form-control'
                                            name='keyword'
                                            required
                                            rows={5}
                                        />
                                        <div className="form-text">
                                            เพิ่มคำสำคัญโดยการคั่นคำด้วยเครื่องหมาย , ระหว่างคำที่ต้องการเพิ่ม เช่น ส่งบทความ,วิชาการ เป็นต้น
                                        </div>
                                    </div>
                                    <div>
                                        <label className='form-label'>หัวข้อ <span className="text-danger">*</span></label>
                                        <select className="form-select" name='cate_paper_code' required disabled={cate.length <= 0}>
                                            <option defaultChecked>-- เลือกหัวข้อ</option>
                                            {cate?.map(list => (
                                                <option key={list._id} value={`${list._id},${list.category_code}`}>{list.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className='form-label'>ประเภทการลงทะเบียน <span className="text-danger">*</span></label>
                                        <select name='regis_type' className="form-select" required>
                                            <option defaultChecked value=''>-- เลือกประเภทการลงทะเบียน</option>
                                            <option value={true}>Early Bird</option>
                                            <option value={false}>Regular</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className='form-label'>คณะ / กลุ่มงาน <span className="text-danger">*</span></label>
                                        <input name='group' className='form-control' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>มหาวิทยาลัย / หน่วยงาน <span className="text-danger">*</span></label>
                                        <input name='university' className='form-control' required />
                                    </div>
                                    {pub.length > 0 &&
                                        <div>
                                            <label className='form-label'>วารสาร</label>
                                            <select name='publication' className="form-select">
                                                <option defaultChecked value=''>-- ไม่เลือกวารสาร</option>
                                                {pub?.map(list => (
                                                    <option key={list._id} value={list._id}>{list.en_name} ({list.th_name})</option>
                                                ))}
                                            </select>
                                        </div>
                                    }
                                    <div>
                                        <label className='form-label'>ที่อยู่ในการติดต่อ <span className="text-danger">*</span></label>
                                        <textarea
                                            name='address'
                                            className='form-control'
                                            required
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label className='form-label'>เบอร์โทรศัพท์ <span className="text-danger">*</span></label>
                                        <input
                                            name='contact'
                                            pattern='[0-9]{10}'
                                            maxLength={10}
                                            className='form-control'
                                            required
                                        />
                                        <div className="form-text">
                                            เฉพาะหมายเลขจำนวน 10 หลักเท่านั้น
                                        </div>
                                    </div>
                                    <div>
                                        <label className='form-label'>อีเมล <span className="text-danger">*</span></label>
                                        <input type='email' className='form-control' name='email' required />
                                        <div className='form-text'>
                                            ใช้สำหรับรับจดหมายเชิญเข้าร่วมงานประชุม
                                        </div>
                                    </div>
                                    {paper.map((items, index) => (
                                        <div key={index} className="mb-2">
                                            <div className="form-text">ไฟล์ที่: {index + 1} <span className="text-danger">*</span></div>
                                            <hr />
                                            <div className="mb-3">
                                                <label className='form-label'>ชื่อไฟล์</label>
                                                <input
                                                    onChange={e => handleChangeFileName(e, index)}
                                                    value={items.name}
                                                    className='form-control'
                                                    type='text'
                                                    id={index}
                                                    required />
                                            </div>
                                            <div>
                                                <label className='form-label'>แนบไฟล์เอกสาร</label>
                                                <div className="input-group">
                                                    <input
                                                        onChange={e => handleChangeFile(e, index)}
                                                        type='file'
                                                        accept='.docx, .pdf'
                                                        className='form-control'
                                                        required />
                                                    <button type='button' onClick={() => handleDelFile(index)} className="btn btn-outline-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="mb-3">
                                        <p className="fw-bold">
                                            กรณีมีมากกว่า 1 ไฟล์
                                        </p>
                                        <button
                                            type='button'
                                            onClick={() => setPaper([...paper, {
                                                id: paper.length + 1,
                                                name: '',
                                                file: null
                                            }])}
                                            className='btn btn-success'>
                                            <i className="bi bi-plus-lg me-2"></i>
                                            เพิ่มไฟล์
                                        </button>
                                    </div>
                                    <div className="form-text">
                                        กรุณาตรวจสอบรายละเอียดให้ครบถ้วนก่อนทำการกดส่งบทความด้านบน
                                    </div>
                                    <div className='text-center my-4 d-block d-lg-none'>
                                        <div className='form-check'>
                                            <input
                                                className={checkError ? 'form-check-input border-danger' : 'form-check-input'}
                                                type='checkbox'
                                                checked={confirmCheck}
                                                onChange={(e) => setConfirmCheck(e)}
                                                autoFocus={checkError}
                                            />
                                            <small className='form-check-label'>ข้าพเจ้าขอรับรองว่า บทความนี้ไม่เคยถูกตีพิมพ์ที่ใดมาก่อน ไม่อยู่ระหว่างการเสนอเพื่อพิจารณาตีพิมพ์ในวารสารหรือสื่อพิมพ์อื่น นับจากวันที่ข้าพเจ้าได้ส่งบทความฉบับนี้มายัง งานประชุม <span className='fw-bold'>{confr?.title}</span> และข้าพเจ้า (และคณะ) เป็นผู้เขียนบทความจริง</small>
                                        </div>
                                        <div className='mt-3'>
                                            <button className='btn btn-primary fw-bold'>ส่งบทความ</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className='col-lg-6'>
                        <div className='text-center my-5 my-md-0 text-white d-none d-lg-block'>
                            <h1 className='mb-3'>ส่งบทความ</h1>
                            <div className="form-check">
                                <input
                                    type='checkbox'
                                    className={checkError ? 'form-check-input border-danger' : 'form-check-input'}
                                    checked={confirmCheck}
                                    onChange={(e) => handleCheck(e)}
                                    autoFocus={checkError}
                                />
                                <div className='form-check-label'>
                                    ข้าพเจ้าขอรับรองว่า บทความนี้ไม่เคยถูกตีพิมพ์ที่ใดมาก่อน ไม่อยู่ระหว่างการเสนอเพื่อพิจารณาตีพิมพ์ในวารสารหรือสื่อพิมพ์อื่น นับจากวันที่ข้าพเจ้าได้ส่งบทความฉบับนี้มายัง งานประชุม
                                    <div className='fw-bold'>
                                        {confr?.title}
                                    </div>
                                    และข้าพเจ้า (และคณะ) เป็นผู้เขียนบทความจริง
                                </div>

                            </div>
                            <div>
                                <button type='submit' className='btn btn-primary'>ส่งบทความ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Submit