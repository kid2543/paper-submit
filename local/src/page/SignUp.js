import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Link,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import React, { useState } from "react";
import axios from "axios";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [tname, setTname] = useState(null);
  const [error, setError] = useState(false);
  const [errorName, setErrorname] = useState(false);
  const [errorlname, setErrorlname] = useState(false);
  const [errortname, setErrortname] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);

  const handleFname = (e) => {
    setFirstname(e.target.value);
    setErrorname(false);
  };
  const handleLname = (e) => {
    setLastname(e.target.value);
    setErrorlname(false);
  };
  const handleRadio = (e) => {
    setTname(e.target.value);
    setErrortname(false);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setErrorUser(false);
  };

  const handleConfirmPassword = (e) => {
    setConfirm(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setErrorConfirm(false);
    setError(false);
  };

  const user = {
    tname: tname,
    fname: firstname,
    lname: lastname,
    username: username,
    password: password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const re = new RegExp("^.*(?=.{8,})(?=.*[a-z])(?=.*[0-9]).*$");
    const isOk = re.test(password);
    if (password === confirm && isOk) {
      await axios
        .post("http://localhost:4000/create/author", {
          tname: user.tname,
          fname: user.fname,
          lname: user.lname,
          username: user.username,
          password: user.password,
        })
        .then((res) => {
          if (res.data === 11000) {
            console.log("User : " + user.username + " already have!");
          } else {
            console.log("User : " + user.username + " Created");
          }
        })
        .catch((err) => console.log(err));
    }
    if (!isOk) {
      setError(true);
    }
    if (!firstname) {
      setErrorname(true);
    }
    if (!tname) {
      setErrortname(true);
    }
    if (!lastname) {
      setErrorlname(true);
    }
    if (!username) {
      setErrorUser(true);
    }
    if (password !== confirm) {
      setErrorConfirm(true);
    }else{
      setErrorConfirm(false)
    }
  };

  return (
    <section>
      <Container maxWidth="sm" sx={{ mt: 5 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography align="center" variant="h4">
            Sign Up for <span style={{ color: "#00A5FF" }}>Submission</span>
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", mt: 5 }}>
            <FormControl required error={errortname}>
              <FormLabel id="radio-buttons">คำนำหน้าชื่อ</FormLabel>
              <RadioGroup
                aria-labelledby="radio-buttons"
                name="radio-buttons-group"
              >
                <Box onClick={handleRadio}>
                  <FormControlLabel value={0} control={<Radio />} label="นาย" />
                  <FormControlLabel value={1} control={<Radio />} label="นาง" />
                  <FormControlLabel
                    value={2}
                    control={<Radio />}
                    label="นางสาว"
                  />
                </Box>
              </RadioGroup>
            </FormControl>
            <TextField
              onChange={handleFname}
              label="ชื่อ"
              sx={{ mt: 5 }}
              required
              error={errorName}
              helperText={errorName ? "จำเป็นต้องใส่ชื่อ" : null}
            ></TextField>
            <TextField
              onChange={handleLname}
              label="นามสกุล"
              sx={{ mt: 5 }}
              required
              error={errorlname}
              helperText={errorlname ? "จำเป็นต้องใส่ นามสกุล" : null}
            ></TextField>
            <TextField
              onChange={handleUsername}
              label="Username (ใช้สำหรับเข้าสู่ระบบ)"
              sx={{ mt: 5 }}
              required
              error={errorUser}
              helperText={errorUser ? "จำเป็นต้องใส่ Username" : null}
            ></TextField>
            <TextField
              onChange={handlePassword}
              label="Password"
              type="password"
              sx={{ mt: 5 }}
              required
              error={error}
              helperText={
                error
                  ? "Password ต้องตรงกันและ จะต้องมีตัวอักษร [a-z]และ[0-9] อย่างน้อย 1 ตัว และต้องมีอย่างน้อย 8 ตัวขึ้นไป"
                  : null
              }
            ></TextField>
            <TextField
              onChange={handleConfirmPassword}
              error={errorConfirm}
              helperText={errorConfirm ? "Password ไม่ตรงกัน" : null}
              label="Confirm Password"
              type="password"
              sx={{ mt: 5 }}
              required
            ></TextField>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              type="submit"
            >
              Sign Up
            </Button>
          </Box>
          <Box sx={{ textAlign: "center", my: 5 }}>
            <Link href="/login">Back to login</Link>
          </Box>
        </Box>
      </Container>
    </section>
  );
}

export default SignUp;
