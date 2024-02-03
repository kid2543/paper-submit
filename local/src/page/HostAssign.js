import React, { useEffect, useState } from 'react'
import {
    Box, Button, List, ListItem, ListItemText
}
from '@mui/material'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import PaperConfr from '../components/Host/PaperConfr'

function HostAssign() {

    const {id} = useParams();
    const [data, setData] = useState()
    const [length, setLength] = useState();
    const navigate = useNavigate()

    const fethConfr = async () => {
        try {
            const res = await axios.get('/get-category-code/' + id)
            setData(res.data)
            setLength(res.data.length)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fethConfr();
    },[])

  return (
    <Box>
        <h1>บทความที่ส่งเข้ามา</h1>
        {data ? (
            <div>
                <p>หัวข้อทั้งหมด {length}</p>
                {length === 0 ? (
                    <>
                        <h3>No Data</h3>
                        <Button variant='outlined' onClick={() => navigate(-1)}>Back</Button>
                    </>
                ): (null)}
                {data.map((item) => (
                    <List key={item._id}>
                        <h3>{item.name}</h3>
                        <hr/>
                        <PaperConfr code={item.category_code} />
                    </List>
                ))}
            </div>
        ):(<h2>Loading....</h2>)}
    </Box>
  )
}

export default HostAssign