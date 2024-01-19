import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";


function NewReviwer() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [username, setUsername] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const createCommitee = await axios.post("/create/committee", {
        fname: fname,
        lname: lname,
        username: username,
        password: "abcd",
        add_by: cookies.get("token"),
      });
      console.log(createCommitee.status)
      alert("Created")
      navigate(-1)
    } catch (error) {
      console.log(error.status);
    }
  };
  return (
    <Box>
      <h2>New Committee</h2>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField label="ชื่อ" onChange={(e) => setFname(e.target.value)} required />
        <TextField label="นามสกุล" onChange={(e) => setLname(e.target.value)} required />
        <TextField
          label="username  / email"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Box sx={{mt:5}}>
          <Button variant="contained" color="success" sx={{mr:3}} type="submit" onSubmit={handleSubmit}>Submit</Button>
          <Button variant="contained" color="inherit" onClick={() => navigate(-1)}>Cancel</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default NewReviwer;
