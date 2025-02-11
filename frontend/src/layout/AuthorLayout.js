import React from 'react'
import AuthorSidebar from '../components/AuthorSidebar/AuthorSidebar'

function AuthorLayout({ children }) {
    return (
        <div className='bg-light'>
            <div style={{ minHeight: '100vh' }}>
                <AuthorSidebar>
                    {children}
                </AuthorSidebar>
            </div>
        </div>
    )
}

export default AuthorLayout