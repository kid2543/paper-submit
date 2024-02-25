import React from 'react'
import { useNavigate } from 'react-router-dom'

function Jumbotron({title, subtitle, btntext, children,link}) {

    const navigate = useNavigate();

    return (
        <div className="h-100 p-5 text-bg-dark rounded-3 mb-4">
            <h2>{title}</h2>
            <p>{subtitle}</p>
            {btntext? (
            <button className="btn btn-outline-primary" type="button" onClick={() => navigate(link)}>{btntext}</button>
            ):(null)}
            {children}
        </div>
    )
}

export default Jumbotron