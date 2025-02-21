import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hook/useFetch'
import LoadingPage from '../components/LoadingPage'
import dayjs from 'dayjs'

function ViewPaper() {

    const { id } = useParams()
    const { data, error, loading} = useFetch('/api/paper/admin/' + id)

    if(loading === 'idle' || loading === 'loading')
        return <LoadingPage />

    if(error)
        return <div>Error</div>

  return (
    <div>
        <h3>รายละเอียดบทความ</h3>
        {data && 
            <div>
                <p>{data.title}</p>
                <p>{data.paper_code}</p>
                <p>{data.cate_code?.name}</p>
                <p>{data.confr_code?.title}</p>
                <p>{data.owner?.username}</p>
                <p>{data.status}</p>
                <p>{data.result}</p>
                <p>{data.payment_status}</p>
                Abstract Only: {data.abstract === true ? <ion-icon name="checkmark"></ion-icon> : <ion-icon name="close"></ion-icon> }
                <p>{data.publication?.en_name}</p>
                <p>{data.regis_type}</p>
                <p>{data.close_name_file}</p>
                <p>{data.author}</p>
                <p>{data.contact}</p>
                <p>Created at: {dayjs(data.createdAt).format('DD MMM YYYY')}</p>
                <p>Updated at: {dayjs(data.updatedAt).format('DD MMM YYYY')}</p>
            </div>
        }
    </div>
  )
}

export default ViewPaper