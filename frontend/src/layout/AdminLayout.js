import React from 'react'
import AdminSidebar from '../components/AdminSidebar/AdminSidebar'

function AdminLayout({ children }) {
    return (
        <div className='bg-light'>
            <div style={{ minHeight: '100vh' }}>
                <AdminSidebar>
                    {children}
                </AdminSidebar>
            </div>
        </div>
    )
}

export default AdminLayout