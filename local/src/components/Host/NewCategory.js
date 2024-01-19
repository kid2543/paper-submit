import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NewCategory() {
  const [topic, setTopic] = useState("");
  const [data, setData] = useState();
  const [code, setCode] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [cateCode, setCateCode] = useState();

  const navigate = useNavigate();
  const {id} = useParams();

  const handleChange = (e) => {
    setTopic(e.target.value);
  };

  const fethTopic = async () => {
    const getTopic = await axios.get("/topic");
    setData(getTopic.data);
  };

  const fethConfr = async () => {
    const getCode = await axios.get('/conferences-get/' + id)
    setCode(getCode.data.confr_code)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submit =  await axios.post("/create/category", {
            name : name,
            desc: desc,
            topic: topic,
            confr_code: code,
            category_code : cateCode
        })
        console.log("Category is created");
        console.log(submit.status)
        navigate(-1)
    } catch (error) {
        console.log(error)
    }

  };

  const handleCanCel = (e) => {
    navigate(-1);
  };

  useEffect(() => {
    fethTopic();
    fethConfr();
  }, []);

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <h2>เพิ่มหัวข้องานประชุม</h2>
      <TextField onChange={(e) => setName(e.target.value)} label="ชื่อหัวข้อ" required />
      <TextField onChange={(e) => setCateCode(e.target.value)} label="Code" required />
      <FormControl>
        <InputLabel id="demo-simple-select-label">ประเภทหัวข้อ</InputLabel>
        {data ? (
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={topic}
            label="ประเภทหัวข้อ"
            onChange={handleChange}
            sx={{ minWidth: 300 }}
            required
          >
            {data.map((item) => (
              <MenuItem key={item._id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <h2>Loading.....</h2>
        )}
      </FormControl>
      <Box sx={{mt:5}}>
      <TextField onChange={(e) => setDesc(e.target.value)} fullWidth multiline minRows={3} label="รายละเอียด" required />
      </Box>
      <Box sx={{mt:5}}>
        <Button type="submit" onSubmit={handleSubmit} variant="contained" sx={{mr:2}}>
          Submit
        </Button>
        <Button onClick={handleCanCel} variant="outlined" color="warning">
          Cancel
        </Button>
      </Box>
    </Box>
  );
}

export default NewCategory;
