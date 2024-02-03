import { Button } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';

function PaperConfr({code}) {

    const {id} = useParams();
    const navigate = useNavigate();
    const [paper, setPaper] = useState();

    const fethPaper = async () => {
        const paper = await axios.get(/conferences-paper/+ code)
        setPaper(paper.data)
    }

    useEffect(() => {
        fethPaper();
    },[code])

    const Assign = (paperid) => {
        navigate(`/host/${id}/view/${paperid}`)
    }

  return (
    <div>
        {paper ? (
            <>
                {paper.map((item) => (
                    <div key={item._id}>
                        <p>Code: <span style={{color:"#40A2D8"}}>{item.paper_code}</span></p>
                        <p>Title: {item.title}</p>
                        <p>Author: {item.author_name}</p>
                        <Button variant='contained' color='success' onClick={() => Assign(item._id)}>Assign</Button>
                    </div>
                ))}
            </>
        ):(
            <h2>Loading.....</h2>
        )}
    </div>
  )
}

export default PaperConfr