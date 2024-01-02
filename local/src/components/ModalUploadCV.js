import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Modal,
} from '@mui/material'
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalUploadCv({openState,onClose,id}) {

  const [data, setData] = useState();
  const [state, setState] = useState(false);
  const [cv, setCV ] = useState();

  useEffect(() => {
    const fethData = async () => {
      try {
        setState(false);
        const getData = await axios.get("/inv-speaker-get/" + id)
        setData(getData.data)
        setState(true);
      } catch (error) {
        console.log(error)
      }
    }
    if(id !== undefined){
      fethData();
    }
  },[id])

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id",id)
    formData.append("file",cv)
    formData.append("img",data.img)
    formData.append("name", data.name)
    formData.append("desc",data.desc)
    formData.append("keynote",data.keynote)
    console.log(formData.get("file"))
    if(cv !== undefined){
      await axios.put("/inv-speaker-upload-cv", formData).then(res => alert("Update")).catch(err => console.log(err))
    } else{
      alert("File is empty")
    }
  }

  return (
    <div>
      <Modal
        open={openState}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {state ? (
          <Box sx={style} component="form" onSubmit={handleUpload}>
          <h4>Upload CV: {data.name}</h4>
            <input type='file' accept='application/pdf' onChange={(e) => setCV(e.target.files[0])} />
            <Button type='submit' onSubmit={handleUpload}>Upload</Button>
        </Box>
        ):(<h2>Loading....</h2>)}
        
      </Modal>
    </div>
  )
}

export default ModalUploadCv