import React, { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Modal,
  TextField,
} from '@mui/material'
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function ModalComponent({openState,onClose,id}) {

  const [state, setState] = useState(false);
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [keynote, setKeynote] = useState();


  useEffect(() => {
    const fethData = async () => {
      try {
        setState(false);
        const getData = await axios.get("/inv-speaker-get/" + id)
        setName(getData.data.name)
        setDesc(getData.data.desc)
        setKeynote(getData.data.keynote)
        setState(true);
      } catch (error) {
        console.log(error)
      }
    }
    if(id !== undefined){
      fethData();
    }
  },[id])

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.post('/inv-speaker-update',{
      name:name,
      desc:desc,
      keynote:keynote,
      id:id,
    }).then(res => alert("Updated")).catch(err => console.log(err))
  }
  
  return (
    <div>
      <Modal
        open={openState}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="form" onSubmit={handleUpdate}>
          {state ? (
            <Box>
                <TextField label="ชื่อ" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
                <TextField label="รายละเอียด" defaultValue={desc} onChange={(e) => setDesc(e.target.value)}/>
                <TextField label="keynote" defaultValue={keynote} onChange={(e) => setKeynote(e.target.value)}/>
                <Button type='submit' onSubmit={handleUpdate}>Update</Button>
            </Box>
          ):(<h2>Loading...</h2>)}
        </Box>
      </Modal>
    </div>
  )
}

export default ModalComponent