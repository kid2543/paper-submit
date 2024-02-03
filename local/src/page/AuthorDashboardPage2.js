import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

function AuthorDashboardPage2() {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [confr, setConfr] = useState();
  const [confrCode, setConfrCode] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [keyword, setKeyword] = useState();
  const [arrKeyword, setArrKeyword] = useState([]);
  //const [file, setFile] = useState([]);
  const [category, setCategory] = useState();
  const cookies = new Cookies();
  const owner = cookies.get("token");
  const navigate = useNavigate();

  const fethConfr = async () => {
    try {
      const getCon = await axios.get("/conferences");
      setConfr(getCon.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fethConfr();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createPaper = await axios.post('/create/paper', {
        title:title,
        author_name:author,
        keyword: arrKeyword,
        submit_code: categoryCode,
        owner: owner,
        status: 0,
        rank: 0
      })
      console.log("Created")
      alert("Paper status is: " + createPaper.status)
      navigate(-1)
    } catch (error) {
      console.log(error)
    }
  };

  const handleChange = async (e) => {
    setConfrCode(e.target.value);
    try {
      let res = await axios.get("/get-category-code/" + e.target.value)
      setCategory(res.data)
    } catch (error) {
      console.log(error)
    }
  };

  const handleCategory = (e) => {
    setCategoryCode(e.target.value)
  }

  const handleKeyword = () => {
    setArrKeyword([...arrKeyword,keyword])
    setKeyword("")
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <h2>ส่งบทความ</h2>
      <TextField
        label="ชื่อบทความ"
        onChange={(e) => setTitle(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="ชื่อ-นามสกุล author"
        onChange={(e) => setAuthor(e.target.value)}
        required
        fullWidth
      />
      <TextField
        label="Keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        fullWidth
      />
        <Button variant="outlined" onClick={handleKeyword}>Add</Button>
        <p>Keyword :</p>
        {arrKeyword.map((keyword,index) => (
          <p key={index}>[{index + 1}] {keyword}</p>
        ))}
      {confr ? (
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">เลือกงานประชุม</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={confrCode}
            label="เลือกงานประชุม"
            onChange={handleChange}
            required
          >
            {confr.map((item) => (
              <MenuItem key={item._id} value={item.confr_code}>
                {item.confr_code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <h2>Loading.....</h2>
      )}
      {category ? (
        <FormControl fullWidth>
        <InputLabel id="select-label">เลือกงานประชุม</InputLabel>
        <Select
          labelId="select-label"
          value={categoryCode}
          label="เลือกงานประชุม"
          onChange={handleCategory}
          required
        >
          {category.map((item) => (
            <MenuItem key={item._id} value={item.category_code}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      ):(
        <h4>โปรดเลือกงานประชุม</h4>
      )}
      <Button variant="contained" color="success" sx={{mr: 1}} type="submit" onSubmit={handleSubmit}>Submit</Button>
      <Button variant="outlined" color="warning">Cancel</Button>
    </Box>
  );
}

export default AuthorDashboardPage2;
