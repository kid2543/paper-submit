import React from 'react'
import AdminSidebar from '../components/AdminSidebar'

function AdminLayout({children}) {
    return (
        <div>
            <div>
                <AdminSidebar />
                <div style={{ marginLeft: "240px" }}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AdminLayout