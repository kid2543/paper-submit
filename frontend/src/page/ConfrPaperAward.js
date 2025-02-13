import React from 'react'
import useFetch from '../hook/useFetch'
import { useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'

function ConfrPaperAward() {

    const { id } = useParams()
    const {
        data,
        error,
        status
    } = useFetch('/api/paper/confr/award/' + id)

    if (status === 'idle' || status === 'loading') {
        return <LoadingPage />
    }

    if (error) {
        return <div>Error...</div>
    }

    return (
        <div>
            <section className="bg-light" style={{ padding: "180px 0px" }}>
                <div className='text-center'>
                    <h1 className='display-1 fw-bold px-2'>บทความที่ได้รับรางวัล</h1>
                    <p className='text-muted'>ดูบทความที่ได้รับรางวัลได้ที่นี่</p>
                </div>
            </section>
            {data.length > 0 &&
                <div>
                    {data.map(items => (
                        <div key={items._id}>
                            {items._id}
                        </div>
                    ))}
                </div>
            }
            <section style={{ padding: "64px 0px" }}>
                <div className="container">
                    <div className="row g-3 row-cols-1">
                        <div className="col">
                            <div className="row">
                                <div className="col-12 col-md-8 mx-auto">
                                    <div className="card">
                                        <div className='card-body'>
                                            <h5 className="fw-bold">No. 1</h5>
                                            <h6 className="card-title">การจัดการทางสังคมเมืองน่านในการป้องกันปัญหาความขัดแย้งทางสังคม</h6>
                                            <div className="card-subtitle mb-2 text-muted">พระชยานันทมุนี,ดร.</div>
                                            <button className="btn btn-primary">ดูเพิ่มเติม</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    )
}

export default ConfrPaperAward