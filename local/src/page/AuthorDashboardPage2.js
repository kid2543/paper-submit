import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,

} from "@mui/material";

import axios from 'axios'
import Cookies from 'universal-cookie'


function AuthorDashboardPage2() {

  const [title, setTitle] = useState();
  const [confr, setConfr] = useState();
  const [file, setFile] = useState([]);
  const cookies = new Cookies()
  const owner = cookies.get('token')

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file',file)
    formData.append('title',title)
    formData.append('confr', confr)
    formData.append('owner',owner )
    await axios.post('/create/paper',formData)
    .then(res => console.log(res))
    .catch(err => console.log(err))
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <h2>ส่งบทความ</h2>
      <TextField label="ชื่อบทความ" onChange={(e) => setTitle(e.target.value)} />
      <TextField label="งานประชุมที่ต้องการส่ง" onChange={(e) => setConfr(e.target.value)} />
      <Box>
        <h4>แนบไฟล์เอกสาร</h4>
        <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])}/>
      </Box>
      <Box sx={{mt:5}}>
        <Button variant="contained" type="submit" onSubmit={handleSubmit}>ส่งบทความ</Button>
      </Box>
    </Box>
  );
}

export default AuthorDashboardPage2;
