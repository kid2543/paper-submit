import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas, Container, Row, Col } from 'react-bootstrap';
import './index.css'


function SidebarV2({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} lg={2} className="d-none d-lg-block bg-dark text-white sidebar">
          <Nav variant='pills' className="flex-column p-3" activeKey={window.location.pathname}>
            <Nav.Link href='/' className='p-3'>
              <h4 className='fw-bold text-white'>PAPERSS</h4>
            </Nav.Link>
            <Nav.Link href="/host/edit" className="text-white">รายละเอียดทั่วไป</Nav.Link>
            <Nav.Link href="/host/edit/regis" className="text-white">ข้อมูลการลงทะเบียน</Nav.Link>
            <Nav.Link href="/host/edit/venue" className="text-white">สถานที่จัดงาน</Nav.Link>
            <Nav.Link href="/host/edit/question" className="text-white">แบบประเมิน</Nav.Link>
            <Nav.Link href="/host/edit/present" className="text-white">การนำเสนอ</Nav.Link>
            <Nav.Link href="/host/edit/guideline" className="text-white">ข้อแนะนำ</Nav.Link>
            <Nav.Link href="/host/edit/partner" className="text-white">ผู้สนับสนุน</Nav.Link>
            <Nav.Link href="/host/edit/category" className="text-white">หัวข้องานประชุม</Nav.Link>
            <Nav.Link href="/host/edit/publication" className="text-white">วารสาร</Nav.Link>
            <Nav.Link href="/host/edit/submission" className="text-white">การส่งบทความ</Nav.Link>
            <Nav.Link href="/host/edit/invite-speaker" className="text-white">พิธีกร</Nav.Link>
            <Nav.Link href="/host/edit/award" className="text-white">รางวัลดีเด่น</Nav.Link>
          </Nav>
        </Col>
        <Col xs={12} lg={10} className="content">
          <Navbar bg="dark" variant="dark" expand="lg" className="d-lg-none p-3 rounded">
            <Button variant="outline-light" onClick={handleShow}>
              <i className='bi bi-list'></i>
            </Button>
          </Navbar>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>PAPERSS</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">
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
                <Nav.Link href="/host/edit/invite-speaker">พิธีกร</Nav.Link>
                <Nav.Link href="/host/edit/award">รางวัลดีเด่น</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
          <div className='container'>
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SidebarV2;

