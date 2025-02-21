import React, { useEffect, useState } from 'react'
import useFetch from '../hook/useFetch'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function ConfrPaperAward() {

    const { id } = useParams()

    const topic = useFetch('/api/category/' + id)

    return (
        <div>
            <section className="bg-light" style={{ padding: "180px 0px" }}>
                <div className='text-center'>
                    <h1 className='display-1 fw-bold px-2'>บทความที่ได้รับรางวัล</h1>
                    <p className='text-muted'>ดูบทความที่ได้รับรางวัลได้ที่นี่</p>
                </div>
            </section>
            <section style={{ padding: '64px 0px' }}>
                <div className="container">
                    <div className="row row-cols-1 g-3">
                        {topic.data?.map((items) => (
                            <div className="card" key={items._id}>
                                <div className="card-body">
                                    <h4>{items.name}</h4>
                                    <PaperAward id={items._id} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ConfrPaperAward

function PaperAward({ id }) {
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const res = await axios.get('/api/paper/confr/award/' + id)
                setData(res.data)
            } catch (error) {
                console.log(error)
            }
        }

        if (id) {
            fetchPaper()
        }

    }, [id])

    const handleAuthor = (list) => {
        let arr = list.split(",")
        return arr
    }

    return (
        <>
            {data.length > 0 ? (
                <ul>
                    {data?.map(items => (
                        <li key={items._id}>
                            <div className="fw-bold">อันดับที่ {items.award_rate}</div>
                            <div>
                                {items.paper_code}
                            </div>
                            <div>
                                {items.title}
                            </div>
                            <div className="mt-3">
                                ผู้แต่ง:<br />
                                {handleAuthor(items.author)?.map((authors,index) => (
                                    <span className="badge text-bg-primary me-2" key={index}>
                                        {authors}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            ) : '-'}
        </>
    )
}