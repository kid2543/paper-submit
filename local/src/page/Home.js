import React from 'react'
import { useNavigate } from 'react-router-dom'
import Logo from '../asset/logo.png'

function Home() {

  const role = sessionStorage.getItem("role")

  const navigate = useNavigate()

  const callToAction = (role) => {
    switch (role) {
      case "host":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/host")} className='btn btn-primary btn-lg me-md-1'>Dashboard</button>
            <button onClick={() => navigate("/tutorial/host")} className='btn btn-lg btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
          </div>
        )
      case "author":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/author")} className='btn btn-lg btn-primary me-md-1'>Dashboard</button>
            <button onClick={() => navigate("/tutorial/author")} className='btn btn-lg btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
          </div>
        )
      case "committee":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/committee")} className='btn btn-lg btn-primary me-md-1'>Dashboard</button>
            <button onClick={() => navigate("/tutorial/committee")} className='btn btn-lg btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
          </div>
        )

      case "admin":
        return (
          <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
            <button onClick={() => navigate("/admin")} className='btn btn-lg btn-primary me-md-1'>Dashboard</button>
          </div>
        )

      default: return (
        <div className='d-grid gap-2 d-sm-flex justify-content-sm-center mb-5'>
          <button onClick={() => navigate("/sign-up")} className='btn btn-lg btn-primary me-md-1'>สมัครสมาชิก</button>
          <button onClick={() => navigate("/tutorial")} className='btn btn-lg btn-outline-secondary'>เรียนรู้เพิ่มเติม</button>
        </div>
      )
    }
  }

  return (
    <div className='container'>
      <section className='py-5 px-4 my-5'>
        <div className='text-center mb-5 mx-auto'>
          <div>
            <img className='d-block mx-auto mb-4' alt='papersubmission-main-logo' src={Logo} height={64} width={64} />
          </div>
          <h1 className='display-5 fw-bold'>Papers Submission</h1>
          <div className='col-lg-6 mx-auto'>
            <p className='text-muted mb-4'>
              เว็บไซต์สำหรับสร้างงานประชุมและ เผยแพร่ พัฒนาคุณภาพและมาตรฐานงานวิจัย เพื่อการค้นคว้าอิสระไปสู่องค์ความรู้ใหม่ และเปลี่ยนความรู้ความคิดเห็นจาก นักวิจัย นักวิชาการ นักศึกษาคณาอาจารย์ เพื่อให้เกิดการนำไปสู่การประยุกต์ใช้ผลงานวิจัย ให้เกิดประโยชน์ต่อชุมชนและสังคม
            </p>
            {callToAction(role)}
          </div>
        </div>
        <div className='mb-5'>
          <h4>งานประชุมวิชาการล่าสุด</h4>
        </div>
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
          <div className='col'>
            <div className='card shadow-sm'>
              <div className='bd-placeholder-img card-img-top d-flex align-items-center justify-content-center' style={{ width: "100%", height: 225 }}>
                <img src={Logo} alt='...' />
              </div>
              <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  </div>
                  <small className="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card shadow-sm'>
              <div className='bd-placeholder-img card-img-top d-flex align-items-center justify-content-center' style={{ width: "100%", height: 225 }}>
                <img src={Logo} alt='...' />
              </div>
              <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  </div>
                  <small className="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
          <div className='col'>
            <div className='card shadow-sm'>
              <div className='bd-placeholder-img card-img-top d-flex align-items-center justify-content-center' style={{ width: "100%", height: 225 }}>
                <img src={Logo} alt='...' />
              </div>
              <div className="card-body">
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  </div>
                  <small className="text-muted">9 mins</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 mb-4 bg-dark text-white rounded-3 my-5">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Custom jumbotron</h1>
            <p className="col-md-8 fs-4">Using a series of utilities, you can create this jumbotron, just like the one in previous versions of Bootstrap. Check out the examples below for how you can remix and restyle it to your liking.</p>
            <button className="btn btn-primary btn-lg" type="button">Example button</button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home