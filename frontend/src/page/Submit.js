import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import UnAuthorized from './UnAuthorized';

function Submit() {

    const id = sessionStorage.getItem('send_paper')
    const [paper, setPaper] = useState([{
        name: "",
        file: null
    }]);
    const [confr, setConfr] = useState({});
    const [cate, setCate] = useState([]);
    const [pub, setPub] = useState([]);
    const [err, setErr] = useState("")
    const navigate = useNavigate()

    const handleDelFile = (index) => {
        setPaper(paper.filter((item, idx) => idx !== index))
    }

    const handleForm = async (e) => {
        e.preventDefault()
        if (paper.length <= 0) {
            toast.warning('กรุณาเลือกไฟล์')
            return
        }
        const {
            advise,
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
        console.log(title.value)
        let cateCode = cate_paper_code.value.split(",")
        const formData = new FormData()
        try {
            formData.append('advise', advise.value)
            formData.append('group', group.value)
            formData.append('university', university.value)
            formData.append('publication', publication.value)
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
                setPub(res.data.publication)
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

    if (!id) {
        return (
            <div style={{ padding: '128px 0px' }}>
                <UnAuthorized />
            </div>
        )
    }

    return (
        <div style={{ padding: '128px 0px' }}>
            <div className='bg-dark position-fixed w-100 top-0' style={{ height: "480px", zIndex: -1 }}>
            </div>
            <form className='container my-5' onSubmit={handleForm}>
                <div className='row'>
                    <div className='col-md-6'>
                        <h1 className='text-white d-block d-md-none mb-4'>ส่งบทความ</h1>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row gy-3'>
                                    <div>
                                        <label className='form-label'>อาจารย์ประจำวิชา</label>
                                        <input name='advise' className='form-control' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>คณะ</label>
                                        <input name='group' className='form-control' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>มหาวิทยาลัย</label>
                                        <input name='university' className='form-control' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>ประเภทบทความ</label>
                                        <select className="form-select" name='cate_paper_code' required disabled={cate.length <= 0}>
                                            <option defaultChecked>-- เลือกประเภทบทความ</option>
                                            {cate?.map(list => (
                                                <option key={list._id} value={`${list._id},${list.category_code}`}>{list.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className='form-label'>วารสาร</label>
                                        <select name='publication' className="form-select" required disabled={pub.length <= 0}>
                                            <option defaultChecked>-- เลือกวารสาร</option>
                                            {pub?.map(list => (
                                                <option key={list._id} value={list._id}>{list.en_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className='form-label'>ประเภทการลงทะเบียน</label>
                                        <select name='regis_type' className="form-select" required>
                                            <option defaultChecked>-- เลือกประเภทการลงทะเบียน</option>
                                            <option value={true}>Early Bird</option>
                                            <option value={false}>Regular</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className='form-label'>ชื่อบทความ</label>
                                        <input className='form-control' name='title' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>คำสำคัญ</label>
                                        <textarea className='form-control' name='keyword' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>ชื่อผู้เขียน</label>
                                        <textarea className='form-control' name='author' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>ที่อยู่ในการติดต่อ</label>
                                        <textarea name='address' className='form-control' required />
                                    </div>
                                    <div>
                                        <label className='form-label'>เบอร์โทรศัพท์</label>
                                        <input name='contact' pattern='[0-9]{10}' maxLength={10} className='form-control' required />
                                        <div className="form-text">
                                            เฉพาะหมายเลขจำนวน 10 หลักเท่านั้น
                                        </div>
                                    </div>
                                    <div>
                                        <label className='form-label'>อีเมล</label>
                                        <input type='email' className='form-control' name='email' required />
                                    </div>
                                    <div>
                                        <div>
                                            กรณีมีมากกว่า 1 ไฟล์
                                        </div>
                                        <button type='button' onClick={() => setPaper([...paper, {}])} className='btn btn-success'>
                                            <i className="bi bi-plus-lg me-2"></i>
                                            เพิ่มไฟล์
                                        </button>
                                    </div>
                                    {paper.map((items, index) => (
                                        <div key={index} className="mb-3">
                                            <div className="mb-3">
                                                <label className='form-label'>ชื่อไฟล์</label>
                                                <input onChange={e => handleChangeFileName(e, index)} value={items.name} className='form-control' type='text' required />
                                            </div>
                                            <div>
                                                <label className='form-label'>แนบไฟล์เอกสาร</label>
                                                <input onChange={e => handleChangeFile(e, index)} type='file' accept='.doc, .pdf' className='form-control' required />
                                            </div>
                                            <div className="text-end my-2">
                                                <button type='button' onClick={() => handleDelFile(index)} className="btn btn-danger">ลบ</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className='text-center my-4 d-block d-md-none'>
                            <small>ข้าพเจ้าขอรับรองว่า บทความนี้ไม่เคยถูกตีพิมพ์ที่ใดมาก่อน ไม่อยู่ระหว่างการเสนอเพื่อพิจารณาตีพิมพ์ในวารสารหรือสื่อพิมพ์อื่น นับจากวันที่ข้าพเจ้าได้ส่งบทความฉบับนี้มายัง งานประชุม {confr?.title} และข้าพเจ้า (และคณะ) เป็นผู้เขียนบทความจริง</small>
                            <div className='mt-3'>
                                <button className='btn btn-light text-dark fw-bold'>ส่งบทความ</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 d-none d-md-block'>
                        <div className='text-center text-white'>
                            <h1 className='mb-3'>ส่งบทความ</h1>
                            {err &&
                                <p className='text-danger fw-bold'>{err}</p>
                            }
                            <p>
                                ข้าพเจ้าขอรับรองว่า บทความนี้ไม่เคยถูกตีพิมพ์ที่ใดมาก่อน ไม่อยู่ระหว่างการเสนอเพื่อพิจารณาตีพิมพ์ในวารสารหรือสื่อพิมพ์อื่น นับจากวันที่ข้าพเจ้าได้ส่งบทความฉบับนี้มายัง งานประชุม {confr?.title} และข้าพเจ้า (และคณะ) เป็นผู้เขียนบทความจริง
                            </p>
                            <div>
                                <button type='submit' className='btn btn-light text-dark fw-bold'>ส่งบทความ</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Submit