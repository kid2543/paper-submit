import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch'

// react component
import Accordion from 'react-bootstrap/Accordion';
import LoadingPage from '../components/LoadingPage';


function ConfrGuideline() {
    const { id } = useParams()
    const { data, error, status } = useFetch('/api/conference/single/' + id)


    if(status === 'idle' || status === 'loading') {
        return <LoadingPage />
    }

    if(error) {
        return <div>Error Page</div>
    }

    return (
        <div className='bg-light'>
            <section style={{ padding: "180px 0px" }}>
                <div className='container text-center'>
                    <h1 className='display-1 fw-bold'>ข้อแนะนำการเข้าร่วมงานประชุม</h1>
                    <p className='text-muted'>อ่านข้อแนะนำการเข้าร่วมงานประชุมได้ที่นี่!</p>
                </div>
            </section>
            {data &&
                <section className='bg-white' style={{ padding: "64px 0px" }}>
                    <div className='container'>
                    <h4 className='fw-bold mb-4'>
                        ข้อแนะนำ
                    </h4>
                        <Accordion>
                            <Accordion.Item eventKey='1'>
                                <Accordion.Header>สำหรับผู้นำเสนอ</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {data.guide_for_presenter?.map((items, index) => (
                                            <li key={index}>{items}</li>
                                        ))}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='2'>
                                <Accordion.Header>สำหรับกรรมการ</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {data.guide_for_chair?.map((items, index) => (
                                            <li key={index}>{items}</li>
                                        ))}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                            <Accordion.Item eventKey='3'>
                                <Accordion.Header>สำหรับผู้ชม</Accordion.Header>
                                <Accordion.Body>
                                    <ul>
                                        {data.guide_for_audience?.map((items, index) => (
                                            <li key={index}>{items}</li>
                                        ))}
                                    </ul>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>
                    </div>
                </section>
            }
        </div>
    )
}

export default ConfrGuideline