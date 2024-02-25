import React from 'react'
import { useNavigate } from 'react-router-dom'

function HostReview() {


  const navigate = useNavigate();

  return (
    <div className='container my-4'>
      <h2 className='text-center'>ข้อแนะนำ และผลการตรวจบทความ</h2>
      <div className='card my-3'>
        <div className='card-header'>
          <h4>รายละเอียดบทความ</h4>
        </div>
        <div className='card-body'>
          <p>Paper Code: รหัสบทความ</p>
          <p>ชื่อบทความ: ชื่อบทความ</p>
          <p>ผลลัพธ์ผู้ตรวจบทความ: สถานะของกรรมการแต่ละคน</p>
          <form>
            <h4>ผลลัพธ์ของบทความ</h4>
            <select className='form-select'>
              <option>--</option>
              <option>ผ่าน</option>
              <option>แก้ไข (ผ่าน)</option>
              <option>แก้ไขค่อนข้างเยอะ (ส่งใหม่)</option>
              <option>ไม่ผ่าน</option>
            </select>
            <button type='submit' className='btn btn-primary mt-3'>Submit</button>
          </form>
        </div>
      </div>
      <div className='card my-3'>
        <div className='card-header'>
          <h4>ข้อแนะนำของกรรมการ</h4>
        </div>
        <div className='card-body'>
          <div className='row'>
            <div className='col-3'>
              หัวข้อบทความ: 
            </div>
            <div className='col'>
              <ul>
                <li>test</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-3'>
              บทคัดย่อ: 
            </div>
            <div className='col'>
              <ul>
                <li>test</li>
              </ul>
            </div>
          </div>
          <hr/>
          <div className='row'>
            <div className='col-3'>
              วิธีการและทฤษฎี: 
            </div>
            <div className='col'>
            <ul>
                <li>test</li>
              </ul>
            </div>
          </div>
          <hr/>
          <div className='row'>
            <div className='col-3'>
              สิ่งที่ค้นพบ: 
            </div>
            <div className='col'>
              <ul>
                <li>test</li>
              </ul>
            </div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-3'>
              การอภิปราย: 
            </div>
            <div className='col'>
            <ul>
                <li>test</li>
              </ul>
            </div>
          </div>
          <hr/>
          <div className='row'>
            <div className='col-3'>
              บทสรุป: 
            </div>
            <div className='col'>
            <ul>
                <li>test</li>
              </ul>
            </div>
          </div>
          <hr/>
          <div className='row'>
            <div className='col-3'>
              ข้อแนะนำต่อผู้แต่ง: 
            </div>
            <div className='col'>
            <ul>
                <li>test</li>
              </ul>
            </div>
          </div>
          <hr/>
          <div className='row'>
            <div className='col-3'>
              Paper Title: 
            </div>
            <div className='col'>
              <button type='button' className='btn btn-outline-primary'>
                <span className='d-flex gap-2'>
                <ion-icon aria-label="pdf" name="document-outline"></ion-icon>
                File Comment
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <button type='button' onClick={() => navigate(-1)} className='btn btn-secondary'>Back</button>
    </div>
  )
}

export default HostReview