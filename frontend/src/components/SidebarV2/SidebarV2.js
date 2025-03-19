import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas, Container, Row, Col } from 'react-bootstrap';
import './index.css'
import { UserDropdown } from '../UserDropdown';
import { Link } from 'react-router-dom';


function SidebarV2({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const confrCode = sessionStorage.getItem('confr_code')

  return (
    <Container fluid>
      <Row>
        <Col xs={12} lg={2} className="d-none text-bg-light d-lg-block border-end sidebar">
          <div className="d-flex flex-column h-100 justify-content-between">
            <Nav variant='pills' className="flex-column p-3" activeKey={window.location.pathname}>
              <Nav.Link href='/' className='p-3'>
                <h4 className='fw-bold'>PAPERSS</h4>
                <h6 className='text-primary fw-bold'>{confrCode}</h6>
              </Nav.Link>
              <Nav.Link href="/host/confr" >แผงควบคุม</Nav.Link>
              <Nav.Link href="/host/edit" >รายละเอียดทั่วไป</Nav.Link>
              <Nav.Link href="/host/edit/regis" >ข้อมูลการลงทะเบียน</Nav.Link>
              <Nav.Link href="/host/edit/venue" >สถานที่จัดงาน</Nav.Link>
              <Nav.Link href="/host/edit/question" >แบบประเมิน</Nav.Link>
              <Nav.Link href="/host/edit/present" >การนำเสนอ</Nav.Link>
              <Nav.Link href="/host/edit/guideline"  >ข้อแนะนำ</Nav.Link>
              <Nav.Link href="/host/edit/partner"  >ผู้สนับสนุน</Nav.Link>
              <Nav.Link href="/host/edit/category"  >หัวข้องานประชุม</Nav.Link>
              <Nav.Link href="/host/edit/publication"  >วารสาร</Nav.Link>
              <Nav.Link href="/host/edit/submission"  >การส่งบทความ</Nav.Link>
              <Nav.Link href="/host/edit/invite-speaker"  >วิทยากร</Nav.Link>
              <Nav.Link href="/host/edit/award" >รางวัลดีเด่น</Nav.Link>
            </Nav>
            <div className="p-3">
              <UserDropdown />
            </div>
          </div>
        </Col>
        <Col xs={12} lg={10} className="content">
          <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none p-3 rounded mb-3">
            <Button variant="outline-light" onClick={handleShow}>
              <i className='bi bi-list'></i>
            </Button>
          </Navbar>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title className='px-3'>
                <Link to='/' className='text-dark fw-bold fs-1'>
                  PAPERSS
                </Link>
                <h6 className='text-primary'>{confrCode}</h6>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
                <Nav.Link href="/host/confr" >แผงควบคุม</Nav.Link>
                <Nav.Link href="/host/edit" >รายละเอียดทั่วไป</Nav.Link>
                <Nav.Link href="/host/edit/regis">ข้อมูลการลงทะเบียน</Nav.Link>
                <Nav.Link href="/host/edit/venue">สถานที่จัดงาน</Nav.Link>
                <Nav.Link href="/host/edit/question">แบบประเมิน</Nav.Link>
                <Nav.Link href="/host/edit/present">การนำเสนอ</Nav.Link>
                <Nav.Link href="/host/edit/guideline">ข้อแนะนำ</Nav.Link>
                <Nav.Link href="/host/edit/partner">ผู้สนับสนุน</Nav.Link>
                <Nav.Link href="/host/edit/category">หัวข้องานประชุม</Nav.Link>
                <Nav.Link href="/host/edit/publication">วารสาร</Nav.Link>
                <Nav.Link href="/host/edit/submission">การส่งบทความ</Nav.Link>
                <Nav.Link href="/host/edit/invite-speaker">วิทยากร</Nav.Link>
                <Nav.Link href="/host/edit/award">รางวัลดีเด่น</Nav.Link>
              </Nav>
              <UserDropdown />
            </Offcanvas.Body>
          </Offcanvas>
          <div className="px-lg-4">
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SidebarV2;

