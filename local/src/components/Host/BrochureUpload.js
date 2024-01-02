import { Box, Button } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

function BrochureUpload() {

    const {id} = useParams();
    const [image, setImage] = useState();

    const handleUpload = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image",image)
            await axios.post("/brochure-upload/" + id,formData)
            console.log("Success")
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <h2>Upload Brochure</h2>
        <Box component="form" onSubmit={handleUpload}>
            <input accept='image/*' type='file' onChange={(e) => setImage(e.target.files[0])} />
            <Button type='submit' onSubmit={handleUpload}>Upload</Button>
        </Box>
    </div>
  )
}

export default BrochureUpload