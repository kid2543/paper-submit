import React, { useState } from "react";
import { TextField, Box, Typography,Button } from "@mui/material";
import axios from 'axios'
import Cookies from 'universal-cookie'

function HostCreateDash() {

  const cookies = new Cookies();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const owner = cookies.get('token')
    axios.post('/create/conferences',{title:title,confr_code:code,owner:owner}).then(res => console.log("Conference Created" + res.data)).catch(err => console.log(err))
  }

  return (
    <Box component="form" sx={{'& > :not(style)':{my:4,mx:'auto',width:'50%'}}} autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h3" sx={{my:2, textAlign:'center'}}>
          สร้างงานประชุมวิชาการ
        </Typography>
      <Box sx={{'& > :not(style)' : {m:1}}}>
        <TextField fullWidth  id="outlined-basic" label="ชื่องานประชุม" variant="outlined" required onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth  id="outlined-basic" label="รหัสงานประชุม" variant="outlined" required onChange={(e) => setCode(e.target.value)} />
        <Box>
          <Button fullWidth  type="submit" variant="contained">Create</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default HostCreateDash;