import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Edit from '../components/HostEdit/Edit';
import Registration from '../components/HostEdit/Registration';
import Venue from '../components/HostEdit/Venue';

function HostEdit() {
  return (
    <div>
      <div className='container my-5'>
        <Tabs
          defaultActiveKey="home"
          className="mb-5 border-bottom"
          variant='underline'
        >
          <Tab eventKey="home" title="หน้าแรก">
            <div className='container'>
              <Edit />
            </div>
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