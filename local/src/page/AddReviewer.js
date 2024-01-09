import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FormGroup,
    FormControlLabel,
    Checkbox,
    Button,
    Box,
}
from '@mui/material'

function AddReviewer() {

    const {id,paper} = useParams()
    const [title, setTitle] = useState()
    const [committees, setCommittees] = useState([])
    const [reviewer, setReviewer] = useState([]);

    const fethPaper = async () => {
        await axios.get('/paper-get/' + paper)
        .then(res => setTitle(res.data.title))
        .catch(err => console.log(err))
    }

    const fethCommittees = async () => {
        await axios.get('/committees-get/' + id)
        .then(res => setCommittees(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        fethPaper();
        fethCommittees();
    },[])

    const handleChange = (e) => {
        const value = e.target.value
        const checked = e.target.checked
        if(checked) {
            setReviewer([...reviewer, value])
        }else{
            setReviewer(reviewer.filter((v) => v !== e.target.value))
        }
    }
    
    const handleAssing =  (e) => {
        e.preventDefault();
        if(reviewer.length !== 0) {
            for(let i = 0; i < reviewer.length ; i++) {
                console.log(reviewer[i])
                axios.post('/committees-assign/'+ reviewer[i],{paper:[...committees[i].review,paper]})
                .then(res => console.log(res.data))
                .catch(err => console.log(err))
            }
        } else{
            console.log("please select")
        }
    }

    console.log()

  return (
    <div>
        <h2>{title}</h2>

        <Box component='form' onSubmit={handleAssing}>
        <FormGroup>
        {committees.map((item) => (
            <FormControlLabel key={item._id} control={<Checkbox />} label={item.fname} value={item._id} onChange={handleChange} />
        ))}
        <Button type='submit' onSubmit={handleAssing}>Assign</Button>
        </FormGroup>
        </Box>
    </div>
  )
}

export default AddReviewer