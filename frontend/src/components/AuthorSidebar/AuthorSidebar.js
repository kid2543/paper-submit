import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Nav, Button, Offcanvas, Container, Row, Col } from 'react-bootstrap';
import './index.css'
import { UserDropdown } from '../UserDropdown';


function AuthorSidebar({ children }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container fluid>
      <Row>
        <Col xs={12} lg={2} className="d-none text-bg-white d-lg-block sidebar border-end">
          <div className="d-flex flex-column h-100 justify-content-between">
            <Nav variant='pills' className="flex-column p-3" activeKey={window.location.pathname}>
              <Nav.Link href='/' className='p-3'>
                <h4 className='fw-bold'>PAPERSS</h4>
              </Nav.Link>
              <Nav.Link href="/author">
                <i className="bi bi-arrow-left-right me-2"></i>
                สถานะบทความ
              </Nav.Link>
            </Nav>
            <div className="p-3">
              <UserDropdown />
            </div>
          </div>
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
                <Nav.Link href="/author">
                  <i className="bi bi-arrow-left-right me-2"></i>
                  สถานะบทความ
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
          <div className="px-4">
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AuthorSidebar;

