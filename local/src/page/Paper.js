import React from 'react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card';

function Paper() {

  const navigate = useNavigate();
  return (
    <div className='container-fluid my-4'>
      <h2>รวมบทความ</h2>
      <div className='row'>
        <div className='col-md'>
          <Card title="ชื่อบทความ" text="ประเภทบทความ" link1="/paper/1" textlink1="ดูบทความ" />
        </div>
        <div className='col-md'>
          <Card title="ชื่อบทความ" text="ประเภทบทความ" link1="/paper/1" textlink1="ดูบทความ" />
        </div>
        <div className='col-md'>
          <Card title="ชื่อบทความ" text="ประเภทบทความ" link1="/paper/1" textlink1="ดูบทความ" />
        </div>
        <div className='col-md'>
          <Card title="ชื่อบทความ" text="ประเภทบทความ" link1="/paper/1" textlink1="ดูบทความ" />
        </div>
      </div>
    </div>
  )
}

export default Paper