import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../components/LoadingPage'

const api = process.env.REACT_APP_API_URL

function Review() {

    const { id } = useParams()

    const [isPaper, setIsPaper] = useState({})
    const [isQuestion, setIsQuestion] = useState([])
    const [suggestionFile, setSuggestionFile] = useState(null)
    const [totalArr, setTotalArr] = useState([])
    const [totalNumber, setTotalNumber] = useState(0)
    const [loading, setLoading] = useState(true)

    const reviewerName = sessionStorage.getItem("fname") + " " + sessionStorage.getItem("lname")

    const handleRate = async (e) => {
        e.preventDefault()
        if (window.confirm("ยืนยันการให้คะแนนหรือไม่? เนื่องจากจะไม่สามารถกลับมาแก้ไขได้")) {
            try {
                if(suggestionFile !== null) {
                    const formData = new FormData()
                    formData.append("file", suggestionFile)
                    const upload = await axios.patch(api + "/upload/comment/" + id, formData)
                    console.log(upload)
                }
                const input = e.target
                const comment = await axios.patch(api + "/add/comment/" + id, {
                    suggestion: input.suggestion.value,
                    rate: totalArr,
                    total: totalNumber,
                    result: input.result.value,
                })
                console.log(comment)
            } catch (error) {
                console.log(error)
            }
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

    useEffect(() => {

        const fethData = async () => {
            try {
                const res = await axios.get(api + "/get/rate/paper/" + id)
                setIsPaper(res.data.paper_id)
                const questionForm = await axios.get(api + "/get/question/" + res.data.paper_id?.confr_code)
                setIsQuestion(questionForm.data)
            } catch (error) {
                console.log(error)
            }
        }

        fethData()

        setTimeout(() => {
            setLoading(false)
        }, 1000)

    }, [id])

    if(loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <div className='container my-5'>
            <div className='card p-3 mb-3 bg-secondary'>
                <h4 className='text-white mb-0'>ให้คะแนนบทความ</h4>
            </div>
            <div className='card p-3 mb-3'>
                <p className='fw-bold mb-0'>รายละเอียดบทความ</p>
                <hr />
                <div className='row gy-3'>
                    <div className='col-12 col-md-6'>Code:</div>
                    <div className='col-12 col-md-6'>{isPaper.paper_code}</div>
                    <div className='col-12 col-md-6'>Title:</div>
                    <div className='col-12 col-md-6'>{isPaper.title}</div>
                    <div className='col-12 col-md-6'>File:</div>
                    <div className='col-12 col-md-6'>
                        {isPaper.close_name_file ? (
                            <a className='link-success text-decoration-none' href={api + "/pdf/" + isPaper.close_name_file} target='_blank' rel='noreferrer'><span role='img'><ion-icon name="document"></ion-icon></span> {isPaper.paper_code}</a>
                        ) : "-"}
                    </div>
                    <div className='col-12 col-md-6'>Reviewer Name:</div>
                    <div className='col-12 col-md-6'>
                        {reviewerName}
                    </div>
                </div>
            </div>
            <div className='card p-3 mb-3'>
                <p className='fw-bold mb-0'>แบบประเมิน <span className='text-danger'>*</span></p>
                <hr />
                <form onSubmit={handleRate}>
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
                            <tbody>
                                {isQuestion?.map((item, index) => (
                                    <QuestionList key={index} title={item} idx={index} handleChnage={handleSetTotal} />
                                ))}
                                <tr>
                                    <td className='text-center fw-bold'>รวมคะแนน:</td>
                                    <td colSpan={10}>
                                        <div className='card m-2 px-3 py-1 bg-secondary'>
                                            <span className='fw-bold text-white'>{totalNumber}</span>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className='mb-3'>
                        <label className='form-label text-muted'>ข้อเสนอแนะ <span className='text-danger'>*</span></label>
                        <textarea aria-label='suggestion' name='suggestion' className='form-control mb-3' required />
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
                            <input className="form-check-input" type="radio" name="result" value={1} required />
                            <label className="form-check-label">
                                Accept submission (ผ่าน)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="result" value={2} required />
                            <label className="form-check-label">
                                Revisions required (ผ่านแบบมีเงื่อนไข)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="result" value={3} required />
                            <label className="form-check-label">
                                Resubmit for review (ส่งใหม่เพื่อให้พิจารณาอีกครั้ง)
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="result" value={4} required />
                            <label className="form-check-label">
                                Decline submission (ไม่ผ่าน)
                            </label>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-primary'>Submit</button>
                    </div>
                </form>
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