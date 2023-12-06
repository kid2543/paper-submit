import React, { useState } from "react";
import {
  Typography,
  TextField,
  FormControl,
  Container,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  Button,
  styled
} from "@mui/material";
import FileUploadIcon from '@mui/icons-material/FileUpload';


function AuthorDashboardPage2() {
  const [age, setAge] = useState("");
  const [file, setFile] = useState({});

  const handleChange = (e) => {
    setAge(e.target.value);
  };

  const handleFile = (e) => {
    setFile(e.target.file)
    console.log(file)
  }

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <section>
      <Container>
        <Typography variant="h4" align="center">
          แบบฟอร์มส่งบทความ
        </Typography>
        <Typography variant="subtitle1">รายละเอียดบทความ</Typography>
        <FormControl fullWidth sx={{ my: 2 }} variant="standard">
          <InputLabel>ประเภทบทความ</InputLabel>
          <Select value={age} onChange={handleChange} label="Age">
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <Grid container spacing={2} sx={{my:2}}>
            <Grid item xs={6}>
              <TextField fullWidth label="ชื่อบทความ" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="คำสำคัญ (Keyword)" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="ชื่อผู้เขียน" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="ที่อยู่ในการติดต่อ" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="เบอร์โทรศัพท์" variant="standard" />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" variant="standard" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" startIcon={<FileUploadIcon />} onClick={upload}>
                  Upload File
              </Button>
              <VisuallyHiddenInput type="file" onChange={(e) => handleFile(e)} id="upload" />
            </Grid>
          </Grid>
        </FormControl>
      </Container>
    </section>
  );
}

export default AuthorDashboardPage2;

function upload() {
  document.getElementById('upload').click();
}
