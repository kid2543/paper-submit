import React from 'react'
import { useNavigate } from 'react-router-dom'


function Card({ title, subtitle, text, link1, textlink1, image, imageText, icon, iconText }) {

  const navigate = useNavigate();

  return (
    <div className='card w-100'>
      {icon ? (
        <img src={"http://localhost:4000/image/" + icon} alt={iconText} width={64} height={64} className='d-block mx-auto img-fluid mt-2' />
      ) : (
        null
      )}
      {image ? (
        <img src={image} alt={imageText} className='card-img-top' />
      ) : null}
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <h6 className='card-subtitle mb-2 text-muted'>{subtitle}</h6>
        <p className='card-text'>{text}</p>
        {link1 ? (
          <button onClick={() => navigate(link1)} className='btn btn-primary'>{textlink1}</button>
        ) : (null)}
      </div>
    </div>
  )
}

export default Card

