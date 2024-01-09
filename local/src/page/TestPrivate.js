
import React from 'react'
import LogoutComponent from '../components/LogoutComponent';
import Cookies from 'universal-cookie';

function TestPrivate() {

  const cookies = new Cookies();
  const token = cookies.get('token')

  return (
    <div>
        <h2>Private Page</h2>
        {token}
        <LogoutComponent/>
    </div>
  )
}

export default TestPrivate