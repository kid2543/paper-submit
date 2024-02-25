import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Jumbotron from '../components/Jumbotron';
import Card from '../components/Card';
import icon from '../asset/energetic.png'
import axios from 'axios'
import dayjs from 'dayjs'



function Confr() {

    const { id } = useParams();
    const api = process.env.REACT_APP_API_URL
    const [data, setData] = useState();
    const [inv, setInv] = useState();

    const fethConfr = async () => {
        try {
            let res = await axios.get(api + "/get/confr/" + id)
            let inv = await axios.get(api + "/get/inv-speaker/" + res.data.confr_code)
            setData(res.data)
            console.log(res.data)
            setInv(inv.data)
            console.log(inv.data)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        fethConfr();
    }, [])

    const navigate = useNavigate();
    const image = "https://res.cloudinary.com/dciv8zipz/image/upload/f_auto,q_auto/cld-sample"

    return (
        <div className='container-fluid my-4'>
            <Jumbotron title={data?.title} subtitle={data?.sub_title} btntext="ส่งบทความ" link="/submit" />
            <Jumbotron title="ABOUT THE CONFERENCE" subtitle={data?.confr_desc} />
            <div className='text-center'>
                <Jumbotron title="TOPIC">
                    <div className='row text-center'>
                        <div className='col-md'>
                            <Card icon={icon} iconText="icon-1" title="Topic 1" />
                        </div>
                        <div className='col-md'>
                            <Card icon={icon} iconText="icon-2" title="Topic 2" />
                        </div>
                        <div className='col-md'>
                            <Card icon={icon} iconText="icon-3" title="Topic 3" />
                        </div>
                    </div>
                </Jumbotron>
            </div>
            <Jumbotron title="รายชื่อกรรมการ" btntext="ดูรายชื่อกรรมการ" link={"/committees-list/" + id} />
            <Jumbotron title="Important Date">
                <ul>
                    {data?.important_date.map((item) => (
                        <li key={item._id}>
                            {item.name}: {dayjs(item.date).format("DD-MM-YYYY")}
                        </li>
                    ))}
                </ul>
            </Jumbotron>
            <Jumbotron title="Publication Option">
                <div className='row'>
                    {data?.publication.map((item, index) => (
                        <div key={index + 1} className='col-md'>
                            <Card title={index + 1} subtitle={item} />
                        </div>
                    ))}
                </div>
            </Jumbotron>
            <Jumbotron title="Invited Speaker" >
                <div className='row'>
                    {inv?.map((item) => (
                        <div key={item._id} className='col-md-4'>
                            <Card image={image} imageText={item.name} title={item.name} subtitle={item.desc} text={item.keynote} />
                            <a href={api + "/pdf/" + item.cv} target='_blank'><button type='button' className='btn btn-primary'>ข้อมูลเพิ่มเติม</button></a>
                        </div>
                    ))}
                </div>
            </Jumbotron>
            <Jumbotron title="Our Partners">
                <div className='row'>
                    <div className='col-md-2 mb-4'>
                        <img src={image} alt="partners" className='w-100' />
                    </div>
                    <div className='col-md-2 mb-4'>
                        <img src={image} alt="partners" className='w-100' />
                    </div>
                    <div className='col-md-2 mb-4'>
                        <img src={image} alt="partners" className='w-100' />
                    </div>
                    <div className='col-md-2 mb-4'>
                        <img src={image} alt="partners" className='w-100' />
                    </div>
                    <div className='col-md-2 mb-4'>
                        <img src={image} alt="partners" className='w-100' />
                    </div>
                    <div className='col-md-2 mb-4'>
                        <img src={image} alt="partners" className='w-100' />
                    </div>
                    <div className='col-md-2 mb-4'>
                        <img src={image} alt="partners" className='w-100' />
                    </div>
                </div>
            </Jumbotron>
        </div>
    )
}

export default Confr