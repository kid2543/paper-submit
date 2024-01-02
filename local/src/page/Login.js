import React, { useState } from "react";
import { Button, Container, TextField, Typography, Box, Link, Alert } from "@mui/material";
import axios from 'axios'
import Cookies from 'universal-cookie'
import { useNavigate } from "react-router-dom";

function Login() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      await axios.post('/login',{username:username,password:password})
      .then(res => {
        if(res.status === 200){
          cookies.set("token",res.data.token,{path: '/', expires: new Date(Date.now() + (1000 * 60 * 60 * 24))})
          navigate("/")
        }
      })
      .catch(err => {setError(err.response.data)}) 
  };
 

  return (
    <section>
      <Container maxWidth="sm" sx={{ mt: 5 }} >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography align="center" variant="h4">
            Sign in for <span style={{color:'#00A5FF'}}>PAPERSS</span>
          </Typography>
          <Box sx={{display:'flex',flexDirection:'column' , mt:5}}>
          <TextField
            onChange={(e) => handleChange(e)}
            label="Username"
          ></TextField>
          <TextField
            onChange={(e) => handlePassword(e)}
            label="Password"
            type="password"
            sx={{mt:5}}
          ></TextField>
          </Box>
          
          <Box sx={{display:'flex', justifyContent:'center', mt:5}}>
          <Button sx={{mr:5}}
            onSubmit={(e) => handleSubmit(e)}
            type="submit"
            variant="contained"
          >
            Sign in
          </Button>
          <Button href="/registor" variant="outlined">
            Sign Up
          </Button>
          </Box>
          {error ? <Alert sx={{mt:2}} severity="warning">{error}</Alert> : null}
        </Box>
        <Typography align="center" sx={{my:5, color:'gray'}}>
            Back to <Link href="/">Home</Link>
        </Typography>
      </Container>
    </section>
  );
}

export default Login;
