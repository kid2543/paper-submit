import React from 'react'
import useFetch from '../hook/useFetch'
import { Link, useParams } from 'react-router-dom'
import LoadingPage from '../components/LoadingPage'

function ConfrPaperAward() {

    const { id } = useParams()
    const {
        data,
        error,
        status
    } = useFetch('/api/paper/confr/award/' + id)

    console.log(data)

    const handleSplit = (author) => {
        const arr = author.split(",")
        return arr
    }

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
            <section style={{ padding: "64px 0px" }}>
                {data && 
                    <div className="row row-cols-1 g-3">
                        {data.map((items) => (
                            <div key={items._id} className="card">
                                <div className="card-body">
                                    <h4 className="card-title">
                                        อันดับที่: {items.award_rate}
                                    </h4>
                                    <div className="card-text">
                                        {items.title}
                                    </div>
                                    <div className='row g-3'>
                                        <div className="">
                                            {handleSplit(items.author).map((authors,index) => (
                                                <span key={index} className="badge bg-primary">{authors}</span>
                                            ) )}
                                        </div>
                                    </div>
                                    <div>
                                        <Link 
                                        to={'/paper/' + items._id} 
                                        className="btn btn-outline-dark">
                                            ดูเพิ่มเติม
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                }
            </section>
        </div>
    )
}

export default ConfrPaperAward