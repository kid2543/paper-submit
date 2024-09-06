import React from 'react'
import personIcon from '../asset/user.png'

function InvCard({ invPhoto, invName, invDesc, invCV, invKeyNote }) {

    const api = process.env.REACT_APP_API_URL

    return (
        <div className="card mb-3 position-relative">
            <div className="row gx-5 align-items-center">
                <div className="col-lg-4">
                    <div className='p-5 text-center'>
                        {invPhoto ? (
                            <img src={"http://localhost:4000/image/" + invPhoto} alt={invPhoto} className='img-fluid rounded' />
                        ) : (
                            <img src={personIcon} alt='...' className='img-fluid' />
                        )}
                    </div>
                </div>
                <div className="p-5 col-lg-8 card-body">
                    <div>
                        <h5 className="card-title">{invName}</h5>
                        <p className="card-text text-muted">{invDesc}</p>
                        <p className="card-text"><small>{invKeyNote}</small></p>
                    </div>
                    <div>
                        {invCV ? (
                            <button type='button' onClick={() => window.open("http://localhost:4000/pdf/" + invCV, "blank")} className='btn btn-primary mt-5 btn-lg'>ดู CV</button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InvCard