import React from 'react'
import HostSidebar from '../components/HostSidebar'
import SidebarV2 from '../components/SidebarV2/SidebarV2'

function HostEditLayout({ children }) {
    return (
        <div className='bg-light'>
            <div style={{minHeight: '100vh'}}>
                <SidebarV2>
                    {children}
                </SidebarV2>
            </div>
        </div>
    )
}

export default HostEditLayout