import React, { useEffect, useState } from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// component
import Host from '../components/Admin/Host';
import Committee from '../components/Admin/Committee';
import Author from '../components/Admin/Author';
import axios from 'axios';

function Admin() {

    const [user, setUser] = useState([])
    const [paper, setPaper] = useState([])
    const [pub, setPub] = useState([])
    const [confr, setConfr] = useState([])

    useEffect(() => {
        const fethUser = async () => {
            try {
                const res = await axios.get('/api/user/all')
                setUser(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        const fethPaper = async () => {
            try {
                const res = await axios.get('/api/paper')
                setPaper(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const fethPub = async () => {
            try {
                const res = await axios.get('/api/publication')
                setPub(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        const fethConfr = async () => {
            try {
                const res = await axios.get('/api/conference/all')
                setConfr(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        fethUser()
        fethPaper()
        fethPub()
        fethConfr()
    }, [])

    let authorNumber = user.filter(items => items.role === 'AUTHOR')
    let hostNumber = user.filter(items => items.role === 'HOST')
    let comitNumber = user.filter(items => items.role === 'COMMITTEE')

    return (
        <div className='py-4'>
            <div className='card  shadow-sm bg-primary text-white py-3 mb-3'>
                <div className='card-body'>
                    <h3 className='fw-bold'>Welcome to <br />Admin Dashboard</h3>
                </div>
            </div>
            {user.length > 0 &&
                <div className='row g-3 mb-3'>
                    <div className='col-6 col-lg-4'>
                        <div className='card  shadow-sm'>
                            <div className='card-body text-center'>
                                <h1>{authorNumber.length}</h1>
                                <h5 className='text-muted'>ผู้ส่งบทความ</h5>
                            </div>
                        </div>
                    </div>
                    {paper &&
                        <div className='col-6 col-lg-4'>
                            <div className='card  shadow-sm'>
                                <div className='card-body text-center'>
                                    <h1>{paper.length}</h1>
                                    <h5 className='text-muted'>บทความ</h5>
                                </div>
                            </div>
                        </div>
                    }
                    <div className='col-6 col-lg-4'>
                        <div className='card  shadow-sm'>
                            <div className='card-body text-center'>
                                <h1>{comitNumber.length}</h1>
                                <h5 className='text-muted'>กรรมการ</h5>
                            </div>
                        </div>
                    </div>
                    {pub &&
                        <div className='col-6 col-lg-4'>
                            <div className='card  shadow-sm'>
                                <div className='card-body text-center'>
                                    <h1>{pub.length}</h1>
                                    <h5 className='text-muted'>วารสาร</h5>
                                </div>
                            </div>
                        </div>
                    }
                    <div className='col-6 col-lg-4'>
                        <div className='card  shadow-sm'>
                            <div className='card-body text-center'>
                                <h1>{hostNumber.length}</h1>
                                <h5 className='text-muted'>ผู้จัดงานประชุม</h5>
                            </div>
                        </div>
                    </div>
                    {confr &&
                        <div className='col-6 col-lg-4'>
                            <div className='card  shadow-sm'>
                                <div className='card-body text-center'>
                                    <h1>{confr.length}</h1>
                                    <h5 className='text-muted'>งานประชุม</h5>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
            <div className='card shadow-sm'>
                <div className='card-body'>
                    <h4 className='fw-bold mb-3'>รายการผู้ใช้งาน</h4>
                    <Tabs
                        defaultActiveKey="host"
                        id="uncontrolled-tab-example"
                        className='mb-3 w-100'
                    >
                        <Tab eventKey="host" title="ผู้จัดงานประชุม">
                            <Host />
                        </Tab>
                        <Tab eventKey="committee" title="กรรมการ">
                            <Committee />
                        </Tab>
                        <Tab eventKey="author" title="ผู้ส่งบทความ">
                            <Author />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Admin