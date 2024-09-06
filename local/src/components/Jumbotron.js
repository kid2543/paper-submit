import React from 'react'
import { useNavigate } from 'react-router-dom'

function Jumbotron({title, subtitle, btntext, children,link, linkId}) {

    const navigate = useNavigate();

    return (
        <div id={linkId} className="h-100 p-5 rounded-3">
            <h2 className='mb-5 text-uppercase text-primary fw-bold'>{title}</h2>
            <p>{subtitle}</p>
            {btntext? (
            <button className="btn btn-primary" type="button" onClick={() => navigate(link)}>{btntext}</button>
            ):(null)}
            {children}
        </div>
    )
}

export default Jumbotron