import React from 'react'
import MockImg from '../../asset/checked.png'

const detail = {
    header: "Chiang Mai",
    desc: [
        "With beautiful nature blended with Lanna Culture and colours of contemporary perfectly Chiang Mai is, therefore, a province that has many tourists, both Thai and foreigners, come in many millions each year. Popular tourist activities in Chiang Mai include worshipping the Phra That doi suthep, which is an important Landmark of Chiang Mai people. Experience the local way of life and shop for stylish handmade products at Thapae Walking Street. Visit various species of plants at the Queen Sirikit botanical Garden and Rajapruek Royal Park. Do not miss to shop art products, taste local CUISINE and see cultures on Nimmanhaemin Road. In addition, nature and mountain tours are another activity that should not be missed when visiting Chiang Mai, whether stepping on the highest point of Thailand at the top of doi inthanon. Absorb the beauty of the rice fields, feel the Cool breeze while watching the giant tiger flower at Doi Ang Khang. Experience Ecotourism HomeStay in Mae Kampong and visit Hmong villages in Doi Pui and many more.",
        "มหาวิทยาลัยหาดใหญ่ 222 ถนนพลพิชัย - บ้านพรุ ตำบลคอหงส์ อำเภอหาดใหญ่ จังหวัดสงขลา 90110"
    ]
}

function Venue() {
    return (
        <div className='row gy-5'>
            <div className='col-12'>
                <div className='card'>
                    <div className='card-body'>
                        <div>
                            <h3>สถานที่จัดงาน</h3>
                            <hr />
                        </div>
                        <div>
                            <div>
                                <img src={MockImg} alt='mock' className='img-fluid' />
                            </div>
                            <div>
                                <h3>{detail.header}</h3>
                                {detail.desc.map((descs,index) => (
                                    <p key={index}>{descs}</p>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Venue