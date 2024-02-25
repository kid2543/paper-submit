import React from 'react'
import Card from '../components/Card'

function PaperDetail() {
  return (
    <div className='container-fluid my-4'>
        <h2 className='text-center'>Vol. 16 No. 1 (2024): Journal of liberal Arts , Prince of Songkla University (In progress)</h2>
        <h6 className='text-center'>วันที่เผยแพร่: 12/12/12</h6>
        <Card title="เกี่ยวกับบทความ" text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
    </div>
  )
}

export default PaperDetail