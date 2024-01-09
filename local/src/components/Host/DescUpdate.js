import { Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function DescUpdate() {

    const {id} = useParams();
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fethData = async () => {
            const getData = await axios.get("/conferences-get/" + id)
            setData(getData.data.confr_desc)
            setLoading(true)
        }
        fethData();
    },[])

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const update = await axios.put("/conferences-update/" + id, {desc:data})
            console.log(update)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div>
        <h2>Update รายละเอียดงานประชุม</h2>
        {loading ? (
            <Box component="form" onSubmit={handleUpdate}>
            <TextField fullWidth multiline rows={5} label="ช่องใส่ข้อความ" defaultValue={data} onChange={(e) => setData(e.target.value)} />
            <Button type='submit' onSubmit={handleUpdate}>Update</Button>
        </Box>
        ):(<h2>Loading....</h2>)}
    </div>
  )
}

export default DescUpdate