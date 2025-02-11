import React from 'react'
import useFetch from '../hook/useFetch'
import LoadingPage from '../components/LoadingPage'

import dayjs from 'dayjs'

function Archive() {

  const { data, error, status } = useFetch('/api/paper/archive')

  if (status === 'idle' && status === 'loading') {
    return <LoadingPage />
  }

  if (error) {
    return <div>เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้งในภายหลัง</div>
  }

  return (
    <div className="bg-light">
      <section className="card mb-3">
        <div className="card-body">
          <h4 className="fw-bold card-title mb-3">รายการบทความที่นำเสนอแล้ว</h4>
          {data &&
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>ชื่อ</th>
                    <th>รหัส</th>
                    <th>ส่ง</th>
                    <th>แก้ไข</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((items, index) => (
                    <tr key={items._id}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        {items.title}
                      </td>
                      <td>
                        {items.paper_code}
                      </td>
                      <td>
                        {dayjs(items.createdAt).format('DD MMM YYYY')}
                      </td>
                      <td>
                        {dayjs(items.updatedAt).format('DD MMM YYYY')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </section>
    </div>
  )
}

export default Archive