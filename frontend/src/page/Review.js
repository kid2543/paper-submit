import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import LoadingPage from '../components/LoadingPage'
import useFetch from '../hook/useFetch'
import { useAuthContext } from '../hook/useAuthContext'
import Dropdown from 'react-bootstrap/Dropdown';
import { useLogout } from '../hook/useLogout'

const api = process.env.REACT_APP_API_URL

function Review() {

    const { id } = useParams()
    const confr_id = sessionStorage.getItem('confr_id')
    const paper = useFetch('/api/assign/one/' + id)
    const question = useFetch('/api/conference/question/' + confr_id)
    const [PaperFile, setPaperFile] = useState([])
    const { user } = useAuthContext()
    const { logout } = useLogout()
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

    const handleRate = async (e) => {
        e.preventDefault()
        if (window.confirm("ยืนยันการให้คะแนนหรือไม่? เนื่องจากจะไม่สามารถกลับมาแก้ไขได้")) {
            try {
                const input = e.target
                if (suggestionFile !== null) {
                    const formData = new FormData()
                    formData.append("file", suggestionFile)
                    formData.append('_id', id)
                    formData.append('suggestion', input.suggestion.value)
                    for(let i in totalArr) {
                        formData.append('rate', totalArr[i])
                    }
                    formData.append('total', totalNumber)
                    formData.append('result', input.result.value)
                    await axios.patch('/api/assign/', formData)
                    alert('Success')
                    navigate('/committee')
                } else {
                    await axios.patch('/api/assign/', {
                        _id: id,
                        suggestion: input.suggestion.value,
                        rate: totalArr,
                        total: totalNumber,
                        result: input.result.value
                    })
                    alert('Success')
                    navigate('/committee')
                }
            } catch (error) {
                console.log(error)
                alert('Error')
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

    const handleLogout = () => {
        logout()
        navigate('/')
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
        <div className='container my-5'>
            <div className='card border-0 shadow-sm mb-5'>
                <div className='card-body'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5 className='fw-bold mb-0'>ตรวจบทความ</h5>
                        <Dropdown>
                            <Dropdown.Toggle className='text-primary' variant="" id="dropdown-basic">
                                <span className='me-2'>
                                    <i className="bi bi-person-circle"></i>
                                </span>
                                {user}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                                <Dropdown.Item href="/setting">Dashboard</Dropdown.Item>
                                <Dropdown.Item className='text-danger' type='button' onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
            {paper.data &&
                <div className='card border-0 shadow-sm mb-5'>
                    <div className='card-body'>
                        <p>รายละเอียดบทความ</p>
                        <div className='row g-3'>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div>
                                    <small className='fw-bold'>ชื่อบทความ</small>
                                </div>
                                <small className='text-muted'>{paper.data.paper_id?.title}</small>
                            </div>
                            <div className='col-12 col-md-6 col-lg-4'>
                                <div>
                                    <small className='fw-bold'>รหัสบทความ</small>
                                </div>
                                <small className='text-muted'>{paper.data.paper_id?.paper_code}</small>
                            </div>
                            <div className='col-12'>
                                <div>
                                    <small className='fw-bold'>File บทความ</small>
                                </div>
                                {PaperFile &&
                                    <ol>
                                        {PaperFile.map((items) => (
                                            <li key={items._id}>
                                                <Link
                                                    className='link-success'
                                                    to={items.read_original ? `${api}/uploads/${items.original_file}` : `${api}/uploads/${items.close_name_file}`}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                >
                                                    {items.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ol>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div className='card p-3 mb-3'>
                <div className='card-body'>
                    <p className='fw-bold'>แบบประเมิน <span className='text-danger'>*</span></p>
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
                                <input className="form-check-input" type="radio" name="result" value="ACCEPT" required />
                                <label className="form-check-label">
                                    Accept submission (ผ่าน)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="result" value="REVISE" required />
                                <label className="form-check-label">
                                    Revisions required (ผ่านแบบมีเงื่อนไข)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="result" value="REJECT" required />
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