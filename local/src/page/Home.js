import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Logo from '../asset/logo.png'
import Notification from '../components/Notification'

const api = process.env.REACT_APP_API_URL

function Home() {

  const role = sessionStorage.getItem("role")

  const navigate = useNavigate()

  const callToAction = (role) => {
    switch (role) {
      case "Host":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/host")} className='btn btn-primary me-md-1'>Dashboard</button>
            <button onClick={() => navigate("/tutorial/host")} className='btn btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
          </div>
        )
      case "Author":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/author")} className='btn btn-primary me-md-1'>Dashboard</button>
            <button onClick={() => navigate("/tutorial/author")} className='btn btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
          </div>
        )
      case "Committee":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/committee")} className='btn btn-primary me-md-1'>Dashboard</button>
            <button onClick={() => navigate("/tutorial/committee")} className='btn btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
          </div>
        )

      case "Admin":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/admin")} className='btn btn-primary me-md-1'>Dashboard</button>
          </div>
        )

      default: return (
        <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
          <button onClick={() => navigate("/sign-up")} className='btn btn-primary me-md-1'>Get Started</button>
          <button onClick={() => navigate("/tutorial")} className='btn btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
        </div>
      )
    }
  }

  const fethPaper = async () => {
    try {
      const res = await axios.get(api + "/paper")
      console.log("paper", res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fethConfr = async () => {
    try {
      const res = await axios.get(api + "/conferences")
      console.log("confr", res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fethPaper()
    fethConfr()
  }, [])

  return (
    <div className='container'>
      <section className='py-5 px-4 my-5'>
        <div className='text-center mb-5 mx-auto'>
          <div>
            <img className='d-block mx-auto mb-4' alt='papersubmission-main-logo' src={Logo} height={64} width={64} />
          </div>
          <h1 className='display-5 fw-bold'>Papers Submission</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='lead mb-4'>
              เว็บไซต์สำหรับสร้างงานประชุมและ เผยแพร่ พัฒนาคุณภาพและมาตรฐานงานวิจัย เพื่อการค้นคว้าอิสระไปสู่องค์ความรู้ใหม่ และเปลี่ยนความรู้ความคิดเห็นจาก นักวิจัย นักวิชาการ นักศึกษาคณาอาจารย์ เพื่อให้เกิดการนำไปสู่การประยุกต์ใช้ผลงานวิจัย ให้เกิดประโยชน์ต่อชุมชนและสังคม
            </p>
            {callToAction(role)}
          </div>
        </div>
        <div>
          <img />
        </div>
      </section>
    </div>
  )
}

export default Home