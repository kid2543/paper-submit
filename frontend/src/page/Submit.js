import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';
const api = process.env.REACT_APP_API_URL

function Submit() {

    const { id } = useParams()

    const [paper, setPaper] = useState();
    const [confr, setConfr] = useState();
    const [cate, setCate] = useState([]);
    const [pub, setPub] = useState([]);
    const [numPaper, setNumPaper] = useState(0)

    const navigate = useNavigate();

    const handleForm = async (e) => {
        e.preventDefault()
        let cateCode = e.target.cate_paper_code.value.split(",")
        try {
            const formData = new FormData(e.target)
            formData.append('file', paper)
            formData.append('confr_code', id)
            formData.append('owner', sessionStorage.getItem('token'))
            formData.append('cate_code', cateCode[0])
            formData.append('paper_code', cateCode[1] + "-" + String(numPaper + 1).padStart(3, '0'))
            const res = await axios.post(api + "/create/paper", formData)
            alert("สร้างงานประชุมสำเร็จ: " + res.statusText)
            navigate('/author')
        } catch (error) {
            alert("ไม่สามารถสร้างงานประชุมได้: " + error.message)
            console.log(error)
        } finally {
            localStorage.clear()
        }
    }

    const handleNumberPaper = async (cate_id) => {
        let cateCode = cate_id.split(",")
        try {
            const res = await axios.get(api + "/get/number/paper/" + cateCode[0] )
            setNumPaper(res.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {

        const fethConfr = async () => {
            try {
                const res = await axios.get(api + "/get/confr/" + id)
                setConfr(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const getCateCode = async () => {
            try {
                const res = await axios.get(api + "/get/category/" + id)
                setCate(res.data)
                const pub = await axios.get(api + "/get/pub/" + id)
                setPub(pub.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethConfr();
        getCateCode();
    }, [id])


    return (
        <div className='container'>
            <form onSubmit={handleForm}>
                <h2 className='fw-bold mb-5'>แบบฟอร์มการส่งบทความ</h2>
                <div className='row'>
                    <div className='col-12 mb-3 mb-md-0'>
                        <div className='form-floating'>
                            <input name='title' className='form-control' type='text' placeholder='ชื่อบทความ' required />
                            <label className='form-label text-muted'>ชื่อบทความ</label>
                        </div>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-6 mb-3 mb-md-0'>
                        <div className='form-floating mb-3'>
                            <select name='confr_code' className='form-select' disabled>
                                <option value={id} >{confr?.confr_code}</option>
                            </select>
                            <label className='form-label text-muted'>รหัสงานประชุม</label>
                        </div>
                    </div>
                    <div className='col-md-6 mb-3 mb-md-0'>
                        <div className='form-floating mb-3'>
                            <select name='cate_paper_code' className='form-select' onChange={e => handleNumberPaper(e.target.value)}  disabled={cate?.length ? (false) : (true)}>
                                <option value="">
                                    -- โปรดเลือกประเภทบทความ
                                </option>
                                {cate?.map((code) => (
                                    <option key={code._id} value={`${code._id},${code.category_code}`}>
                                        {code.name}
                                    </option>
                                ))}
                            </select>
                            <label className='form-label text-muted'>ประเภทบทความ</label>
                        </div>
                    </div>
                    <div className='col-md-6 mb-3 mb-md-0'>
                        <div className='form-floating mb-3'>
                            <select name='pub' className='form-select' disabled={pub?.length ? (false) : (true)}>
                                <option value="">
                                    -- โปรดเลือกวารสาร
                                </option>
                                {pub?.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.en_name}
                                    </option>
                                ))}
                            </select>
                            <label className='form-label text-muted'>Publication Option</label>
                        </div>
                    </div>
                    <div className='col-md-6 mb-3 mb-md-0'>
                        <div className='form-floating mb-3'>
                            <select className='form-select' required name='regis_type'>
                                <option value="">
                                    --
                                </option>
                                <option value="Regular">
                                    Regular
                                </option>
                                <option value="Early Bird">
                                    Early Bird
                                </option>
                            </select>
                            <label className='form-label text-muted'>Registation type</label>
                        </div>
                    </div>
                </div>
                <div className='form-group'>
                    <label className='mb-2 form-label text-muted'>แนบไฟล์เอกสาร</label>
                    <input onChange={e => setPaper(e.target.files[0])} accept='.pdf' className='form-control mt-0' type='file' placeholder='แนบไฟล์เอกสาร' />
                    <div className='mt-3'>
                        <small className='text-center text-muted'>
                            ข้าพเจ้าขอรับรองว่า บทความนี้ไม่เคยลงตีพิมพ์ที่ใดมาก่อน ไม่อยู่ระหว่างการเสนอเพื่อพิจารณาตีพิมพ์ในวารสารหรือสิ่งพิมพ์อื่น นับจากวันที่ข้าพเจ้าได้ส่งบทความฉบับนี้มายังกองบรรณาธิการ
                            วารสารวิชาการนั้นๆ และข้าพเจ้า (และคณะ) เป็นผู้เขียนบทความจริง
                        </small>
                    </div>
                </div>
                <div className='my-4'>
                    <button type='submit' className='btn btn-outline-primary me-2'>ส่งบทความ</button>
                    <button type='button' className='btn btn-outline-danger' onClick={() => navigate(-1)}>ยกเลิก</button>
                </div>
            </form>
        </div>
    )
}

export default Submit