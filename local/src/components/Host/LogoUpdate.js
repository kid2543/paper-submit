import { Button } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';

//icon
import FileUploadIcon from '@mui/icons-material/FileUpload';

function LogoUpdate() {

    const [file, setFile] = useState(null);
    const {id} = useParams();
    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append(
                "image",
                file
            )
            console.log(file)
            const upload = await axios.post("/conferences-upload/"+id, formData)
            console.log(upload)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <form>
        <input type='file' onChange={(e) => setFile(e.target.files[0])} />
        <Button onClick={handleUpload}><FileUploadIcon/></Button>
    </form>
  )
}

export default LogoUpdate