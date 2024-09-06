import React, { useState } from 'react'
import SideBar from './SideBar'



function TestComponent() {



  return (
    <section>
      <div className='row main'>
        <div className='col-2 col-md-4 col-lg-2'>
          <SideBar />
        </div>
        <div className='col p-3'>
          Content
        </div>
      </div>
    </section>
  )
}

export default TestComponent