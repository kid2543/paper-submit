import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Edit from '../components/HostEdit/Edit';
import Registration from '../components/HostEdit/Registration';
import Venue from '../components/HostEdit/Venue';
import Category from '../components/HostEdit/Category';

function HostEdit() {
  return (
    <div>
      <div className='container'>
        <Tabs
          defaultActiveKey="home"
          className="mb-3"
          variant='underline'
        >
          <Tab eventKey="home" title="หน้าแรก">
            <div className='container'>
              <Edit />
            </div>
          </Tab>
          <Tab eventKey="program" title="หัวข้อ">
            <Category />
          </Tab>
          <Tab eventKey="registration" title="อัตราค่าลงทะเบียน">
            <Registration />
          </Tab>
          <Tab eventKey="conference venue" title="สถานที่จัดงานประชุม">
            <Venue />
          </Tab>
        </Tabs>
      </div>
    </div>
  )
}

export default HostEdit