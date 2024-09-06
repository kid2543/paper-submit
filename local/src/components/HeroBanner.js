import React from 'react'
import mockImage from '../asset/energetic.png'
import { useNavigate } from 'react-router-dom'

function HeroBanner({ title, subtitle, heroImage }) {

    const navigate = useNavigate()

    const api = process.env.REACT_APP_API_URL

    return (
        <div className='row gx-5 align-items-center'>
            <div className='col-md-6'>
                <div>
                    <h2>{title}</h2>
                    <h6>{subtitle}</h6>
                    <button onClick={() => navigate("/submit")} type='button' className='btn btn-secondary btn-lg my-1'>ส่งบทความ</button>
                </div>
            </div>
            {heroImage ? (
                <div className='col-md-6 mt-3 mt-md-0 text-center'>
                    <img height={300} width="auto" src={api + "/image/" + heroImage} alt='hero-banner' />
                </div>
            ) : (
                <div className='col-md-6 mt-3 mt-md-0'>

                </div>
            )}

        </div>
    )
}

export default HeroBanner