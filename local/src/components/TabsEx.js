import React from 'react'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Edit from '../page/Edit'
import EditPresenter from '../page/EditPresenter'
import EditDate from '../page/EditDate'

function TabsEx() {
    return (
        <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Home">
                <Edit />
            </Tab>
            <Tab eventKey="profile" title="Profile">
                <EditPresenter />
            </Tab>
            <Tab eventKey="contact" title="Contact">
                <EditDate />
            </Tab>
        </Tabs>
    )
}

export default TabsEx