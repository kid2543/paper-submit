import React, { useState, useEffect } from "react";
import { TextField, Box, Typography,Button ,OutlinedInput,MenuItem, Select, FormLabel } from "@mui/material";
import axios from 'axios'
import Cookies from 'universal-cookie'

function HostCreateDash() {

  const cookies = new Cookies();
  const [title, setTitle] = useState("");
  const [code, setCode] = useState("");
  const [topic, setTopic] = useState([]);
  const [ctcode, setctCode] = useState([]);

  useEffect(() => {
    axios.get('/category').then(res => {
        setTopic(res.data)
    }).catch(err => console.log(err))
},[])

const handleChange = (event) => {
  const {
    target: { value },
  } = event;
  setctCode(
    // On autofill we get a stringified value.
    typeof value === 'string' ? value.split(',') : value,
  );
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const owner = cookies.get('token')
    axios.post('/create/conferences',{title:title,confr_code:code,category_code:ctcode,owner:owner}).then(res => console.log("Conference Created" + res.data)).catch(err => console.log(err))
  }

  return (
    <Box component="form" sx={{'& > :not(style)':{my:4,width:'100%'}}} autoComplete="off" onSubmit={handleSubmit}>
      <Typography variant="h3" sx={{my:2}} align="center">
          สร้างงานประชุมวิชาการ
        </Typography>
      <Box sx={{'& > :not(style)' : {my:1}}}>
        <TextField fullWidth id="outlined-basic" label="ชื่องานประชุม" variant="outlined" required onChange={(e) => setTitle(e.target.value)} />
        <TextField fullWidth id="outlined-basic" label="รหัสงานประชุม" variant="outlined" required onChange={(e) => setCode(e.target.value)} />
        <FormLabel id="label-category">หัวข้อที่เกี่ยวข้อง</FormLabel>
        <Select fullWidth
          labelId="label-category"
          multiple
          value={ctcode}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
        >
        {topic.map((data) => 
            <MenuItem
            key={data._id}
            value={data.c_code} 
          >
            {data.name}
          </MenuItem>
        )}
        </Select>
        <Button fullWidth type="submit" variant="outlined">Create</Button>
      </Box>
    </Box>
  );
}

export default HostCreateDash;