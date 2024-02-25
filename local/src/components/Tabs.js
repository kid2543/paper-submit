import React, { useState } from 'react'
import Nav from 'react-bootstrap/Nav'

function Tabs({children ,id, key }) {

    return (
        <>
            <Nav variant="tabs" defaultActiveKey="link-0" activeKey={key}>
                <Nav.Item>
                    <Nav.Link eventKey="link-0" href={"/host/edit/" + id}>รายละเอียดทั่วไป</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/present-guide"} eventKey="link-1">ข้อแนะนำการนำเสนอ</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/regis"} eventKey="link-2">รายละเอียดการลงทะเบียน</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/regis-type"} eventKey="link-3">ประเภทการลงทะเบียน</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/important-date"} eventKey="link-4">กำหนดการ</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/pub"} eventKey="link-5">วารสาร</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/venue"} eventKey="link-6">รายละเอียดสถานที่ท่องเที่ยว</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/partner"} eventKey="link-7">Upload รูป Partner</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/logo"} eventKey="link-8">Upload รูป Logo</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/poster"} eventKey="link-9">Upload รูป Poster</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href={'/host/edit/' + id + "/schedule"} eventKey="link-10">Upload กำหนดการ</Nav.Link>
                </Nav.Item>
            </Nav>
            {children}
        </>

    )
}

export default Tabs