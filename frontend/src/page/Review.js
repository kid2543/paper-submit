import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../components/LoadingPage'
import useFetch from '../hook/useFetch'
import { toast } from 'react-toastify'
import ConfirmDialog from '../components/ConfirmDialog'
import { UserDropdown } from '../components/UserDropdown'

function Review() {

    const { id } = useParams()
    const confr_id = sessionStorage.getItem('confr_id')


    // fetch data
    const paper = useFetch('/api/assign/one/' + id)
    const question = useFetch('/api/conference/question/' + confr_id)


    const [PaperFile, setPaperFile] = useState([])
    const [suggestionFile, setSuggestionFile] = useState(null)
    const [totalArr, setTotalArr] = useState([])
    const [totalNumber, setTotalNumber] = useState(0)

    useEffect(() => {
        const fethFile = async () => {
            try {
                const res = await axios.get('/api/paperfile/read/' + paper.data.paper_id._id)
                setPaperFile(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (paper.data) {
            fethFile()
        }
    }, [paper])


    const navigate = useNavigate()

    // confirm submit score
    const [showConfirm, setShowConfirm] = useState(false)
    const [suggestion, setSuggestion] = useState('')
    const [result, setResult] = useState('')
    const [loadingRate, setLoadingRate] = useState(false)

    const handleRate = async () => {
        setLoadingRate(true)
        try {
            if (suggestionFile !== null) {
                const formData = new FormData()
                formData.append("file", suggestionFile)
                formData.append('_id', id)
                formData.append('suggestion', suggestion)
                for (let i in totalArr) {
                    formData.append('rate', totalArr[i])
                }
                formData.append('total', totalNumber)
                formData.append('result', result)
                formData.append('confr_id', confr_id)
                formData.append('paper_code', paper.data.paper_id?.paper_code)
                await axios.patch('/api/assign', formData)
                toast.success('ให้คะแนน และอัพโหลดไฟล์สำเร็จ')
                setTimeout(
                    navigate('/committee'),
                    1000
                )
            } else {
                await axios.patch('/api/assign', {
                    _id: id,
                    suggestion: suggestion,
                    rate: totalArr,
                    total: totalNumber,
                    result: result,
                    confr_id,
                    paper_code: paper.data.paper_id?.paper_code
                })
                toast.success('ให้คะแนนสำเร็จ')
                setTimeout(
                    navigate('/committee'), 1000
                )
            }
        } catch (error) {
            console.log(error)
            toast.error('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
        } finally {
            setShowConfirm(false)
            setLoadingRate(false)
        }
    }

    const handleSetTotal = (e, idx) => {
        let copy = totalArr
        let num = 0
        let x = parseInt(e.target.value)
        copy[idx] = x
        setTotalArr(copy)
        for (let i in copy) {
            setTotalNumber(num += copy[i])
        }
    }

    if (paper.loading === 'idle' || paper.loading === 'loading') {
        return (
            <LoadingPage />
        )
    }

    if (paper.error) {
        return <div>Error</div>
    }

    if (paper.data?.status === 'SUCCESS') {
        return <div>บทความนี้ตรวจแล้ว</div>
    }



    return (
        <div className='container my-3'>
            <ConfirmDialog
                show={showConfirm}
                handleClose={() => setShowConfirm(false)}
                handleSubmit={handleRate}
                header='ยืนยันการให้คะแนน'
                text='ต้องการยืนยันการให้คะแนนหรือไม่เนื่องจากจะไม่สามารถกลับมาแก้ไขได้'
                loading={loadingRate}
            />
            <div className='card  shadow-sm mb-3'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h4 className='fw-bold mb-0'>ตรวจบทความ</h4>
                        <UserDropdown />
                    </div>
                </div>
            </div>
            {paper.data &&
                <div className='card  shadow-sm mb-3'>
                    <div className='card-body'>
                        <h4 className='card-title mb-4'>รายละเอียดบทความ</h4>
                        <div className='row g-3 row-cols-1'>
                            <div>
                                <p className='fw-bold mb-0'>ชื่อบทความ</p>
                                <p className='text-muted'>{paper.data.paper_id?.title}</p>
                            </div>
                            <div>
                                <p className='fw-bold mb-0'>รหัสบทความ</p>
                                <p className='text-muted'>{paper.data.paper_id?.paper_code}</p>
                            </div>
                            <div>
                                <div className='fw-bold'>บทคัดย่อ</div>
                                <div className='text-muted'><span className='ms-3'>{paper.data.paper_id?.abstract}</span></div>
                            </div>
                            <div className='col-12'>
                                <div>
                                    <p className='fw-bold'>File บทความ</p>
                                </div>
                                {PaperFile &&
                                    <ul>
                                        {PaperFile.map((items) => (
                                            <li key={items._id}>
                                                <Link
                                                    className='link-success'
                                                    to={`/uploads/${items.close_name_file}`}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    <i className='bi bi-file-earmark me-2'></i>
                                                    {items.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='card mb-3'>
                <div className='card-body'>
                    <h4 className='mb-4'>แบบประเมิน <span className='text-danger'>*</span></h4>
                    <form>
                        <div className='table-responsive mb-3'>
                            <table className='table table-hover table-bordered align-middle'>
                                <thead>
                                    <tr>
                                        <th>คำถาม</th>
                                        <th className='text-center'>10</th>
                                        <th className='text-center'>9</th>
                                        <th className='text-center'>8</th>
                                        <th className='text-center'>7</th>
                                        <th className='text-center'>6</th>
                                        <th className='text-center'>5</th>
                                        <th className='text-center'>4</th>
                                        <th className='text-center'>3</th>
                                        <th className='text-center'>2</th>
                                        <th className='text-center'>1</th>
                                    </tr>
                                </thead>
                                {question.data &&
                                    <tbody>
                                        {question.data.map((item, index) => (
                                            <QuestionList key={index} title={item} idx={index} handleChnage={handleSetTotal} />
                                        ))}
                                        <tr>
                                            <td className='text-center fw-bold'>รวมคะแนน:</td>
                                            <td colSpan={10}>
                                                <div className='card m-2 px-3 py-1'>
                                                    <span className='fw-bold text-success'>{totalNumber}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                }
                            </table>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>ข้อเสนอแนะ <span className='text-danger'>*</span></label>
                            <textarea
                                value={suggestion}
                                onChange={e => setSuggestion(e.target.value)}
                                aria-label='suggestion'
                                name='suggestion'
                                className='form-control mb-3'
                                required
                            />
                            <small className='text-muted'>ถ้าไม่มีให้ใส่ -</small>
                        </div>
                        <div className='mb-3'>
                            <label className='form-label text-muted'>Upload File ข้อแนะนำ</label>
                            <div>
                                <input className='form-control mb-3' type='file' accept='.pdf,.doc' onChange={e => setSuggestionFile(e.target.files[0])} />
                            </div>
                        </div>
                        <div className='mb-3'>
                            <p className='fw-bold'>ผลลัพธ์</p>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="result"
                                    value="ACCEPT"
                                    onChange={e => setResult(e.target.value)}
                                    required
                                />
                                <label className="form-check-label">
                                    Accept submission (ผ่าน)
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="result"
                                    value="MINOR"
                                    onChange={e => setResult(e.target.value)}
                                    required
                                />
                                <label className="form-check-label">
                                    Minor Revision (ผ่านแบบมีเงื่อนไข)
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="result"
                                    value="MAJOR"
                                    onChange={e => setResult(e.target.value)}
                                    required
                                />
                                <label className="form-check-label">
                                    Major Revision (แก้ไข)
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="result"
                                    value="REJECT"
                                    onChange={e => setResult(e.target.value)}
                                    required />
                                <label className="form-check-label">
                                    Decline submission (ไม่ผ่าน)
                                </label>
                            </div>
                        </div>
                        <div>
                            <button
                                type='button'
                                onClick={() => setShowConfirm(true)}
                                className='btn btn-primary'
                                disabled={!result || !suggestion || totalArr.length < question.data?.length || totalArr.length <= 0}
                            >
                                ยืนยันการให้คะแนน
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Review

function QuestionList({ title, idx, handleChnage }) {

    return (
        <tr>
            <td>{title}</td>
            <td className="text-center">
                <div>
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={10} aria-label='rate' required />
                </div>
            </td>
            <td className='text-center'>
                <div>
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={9} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={8} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={7} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={6} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={5} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={4} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={3} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={2} aria-label='rate' required />
                </div>
            </td>
            <td className="text-center">
                <div  >
                    <input className="form-check-input" type="radio" name={"rate_" + idx} onChange={e => handleChnage(e, idx)} value={1} aria-label='rate' required />
                </div>
            </td>
        </tr>
    )
}