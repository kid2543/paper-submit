import React from 'react'
import Nav from 'react-bootstrap/Nav';
import { UserDropdown } from './UserDropdown';


function HostSidebar() {

    const sidebarStyle = {
        height: "100%",
        width: "240px",
        position: "fixed",
        zIndex: 1,
        top: 0,
        left: 0,
        overflowX: "hidden",
        backgroundColor: '#FFF'
    }


    return (
        <section style={sidebarStyle}>
            <div className='h-100'>
                <div className="d-flex flex-column justify-content-between h-100">
                    <div className='px-3 pt-3' >
                        <a href='/' className='text-decoration-none text-primary'>
                            <h3 className='fw-bold'>PAPERSS</h3>
                        </a>
                        <hr />
                        <Nav variant='pills' activeKey={window.location.pathname} className="flex-column sidebar" style={{ fontSize: "14px" }}>
                            <Nav.Link className='mb-2' href="/host/edit">รายละเอียดทั่วไป</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/regis">ข้อมูลการลงทะเบียน</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/venue">สถานที่จัดงาน</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/question">แบบประเมิน</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/present">การนำเสนอ</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/guideline">ข้อแนะนำ</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/partner">ผู้สนับสนุน</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/category">หัวข้องานประชุม</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/publication">วารสาร</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/submission">การส่งบทความ</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/invite-speaker">พิธีกร</Nav.Link>
                            <Nav.Link className='mb-2' href="/host/edit/award">รางวัลดีเด่น</Nav.Link>
                        </Nav>
                    </div>
                    <div className='p-3'>
                        <hr />
                        <UserDropdown />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HostSidebar