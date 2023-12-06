import React, { useState } from "react";
import { Button, Container, TextField, Typography, Box } from "@mui/material";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
    console.log(username)
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    console.log(password)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("You are login");
    console.log("handleSubmit");
  };

  return (
    <section>
      <Container maxWidth="sm" sx={{ mt: 5 }} >
        <Box component="form" onSubmit={handleSubmit}>
          <Typography align="center" variant="h4">
            Loing
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
            Login
          </Button>
          <Button href="/registor" variant="outlined">
            Sign Up
          </Button>
          </Box>
          
        </Box>
      </Container>
    </section>
  );
}

export default Login;
