import React, { useEffect, useState } from 'react'
import {
    Box, Button, List, ListItem, ListItemText
}
from '@mui/material'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

function HostAssign() {

    const {id} = useParams();
    const [data, setData] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        const fethConfr = async () => {
            await axios.get('/conferences-paper/' + id)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
        }
        fethConfr();
    },[])

    const addCommittees = (paper) => {
        navigate(`/host/${id}/view/${paper}`)
    } 

  return (
    <Box>
        <h1>บทความที่ส่งเข้ามา</h1>
        {data ? (
            <div>
                {data.map((item) => (
                    <List key={item._id}>
                    <h3>{item.title}</h3>
                    <ListItem>
                        <ListItemText>{item.owner}</ListItemText>
                        <ListItemText>{item.category_name}</ListItemText>
                        <a href={"http://localhost:4000/pdf/" + item.file} target='_blank' rel='noreferrer'>{item.file}</a>
                        <Button onClick={() => addCommittees(item._id)}>เพิ่มกรรมการ</Button>
                    </ListItem>
                    <hr/>
                </List>
                ))}
            </div>
        ):(<h2>Loading....</h2>)}
    </Box>
  )
}

export default HostAssign