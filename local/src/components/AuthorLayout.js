import React from 'react'
import { NavbarAuthor } from './Navbar'

function AuthorLayout({ children }) {
  return (
    <div>
      <div className='mb-5'>
        <NavbarAuthor />
      </div>
      <main>
        {children}
      </main>
    </div>
  )
}

export default AuthorLayout