import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Edit from '../page/Edit'
import EditPresenter from '../page/EditPresenter'
import EditRegis from '../page/EditRegis'
import EditRegisType from '../page/EditRegisType'

function HostEdit() {

  const { id } = useParams();
  const api = process.env.REACT_APP_API_URL

  const [data, setData] = useState();

  const fethConfr = async () => {
    try {
      let res = await axios.get(api + "/get/confr/" + id)
      setData(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fethConfr();
  }, [])

  return (
    <div className='container my-4'>
        <Tabs className='tabs-text' defaultActiveKey="page1">
            <Tab eventKey="page1" title="รายละเอียดทั่วไป">
                <Edit 
                data={data} 
                id={id} 
                api={api} 
                />
            </Tab>
            <Tab eventKey="page2" title="ข้อแนะนำการนำเสนอ">
                <EditPresenter 
                remark={data?.presentation_guide.remark} 
                detail={data?.presentation_guide.detail} 
                present={data?.presentation_guide.for_presenters} 
                sessionChair={data?.presentation_guide.for_session_chair}
                audience={data?.presentation_guide.for_audience}
                api={api}
                id={id}
                />
            </Tab>
            <Tab eventKey="page3" title="รายละเอียดการลงทะเบียน">
                <EditRegis 
                id={id} 
                api={api} 
                remark={data?.regis.remark} 
                earlyDate={data?.regis.early_bird_date}
                regularDate={data?.regis.regular_date}
                bankName={data?.regis.bank_name}
                acName={data?.regis.ac_name}
                acType={data?.regis.ac_type}
                acNo={data?.regis.ac_no}
                />
            </Tab>
            <Tab eventKey="page4" title="ประเภทการลงทะเบียน">
                <EditRegisType id={id} api={api} data={data?.regis_type} />
            </Tab>
        </Tabs>
    </div>
  )
}

export default HostEdit