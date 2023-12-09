import React from "react";
import { TextField, Box, Typography } from "@mui/material";

function HostCreateDash() {
  return (
    <Box component="form" sx={{'& > :not(style)':{my:4,width:'100%'}}} autoComplete="off">
      <Typography variant="h3" sx={{my:2}} align="center">
          สร้างงานประชุมวิชาการ
        </Typography>
      <Box sx={{'& > :not(style)' : {my:1}}}>
        <TextField fullWidth id="outlined-basic" label="ชื่องานประชุม" variant="filled" />
        <TextField fullWidth id="outlined-basic" label="รหัสงานประชุม" variant="filled" />
        <TextField fullWidth id="outlined-basic" label="หัวข้องานประชุม" variant="filled" />
      </Box>
      <Box sx={{'& > :not(style)':{my:1}}}>
          <Typography variant="h4">
              ข้อมูลภายในงานประชุม
          </Typography>
          <Typography variant="subtitle1">
            presentation_guide
          </Typography>
          <TextField fullWidth id="outlined-basic" label="detail : Array" variant="filled" />
          <Typography variant="subtitle1">
            regis
          </Typography>
          <TextField fullWidth id="outlined-basic" label="final_date : Array" variant="filled" />
          <TextField fullWidth id="outlined-basic" label="regis_type : Array" variant="filled" />
          <Typography variant="subtitle1">
            important_date
          </Typography>
          <TextField fullWidth id="outlined-basic" label="important_date : Array" variant="filled" />
          <Typography variant="subtitle1">
            schedule
          </Typography>
          <TextField fullWidth id="outlined-basic" label="schedule : Array" variant="filled" />
          <Typography variant="subtitle1">
            Publication
          </Typography>
          <TextField fullWidth id="outlined-basic" label="publiccation : Array" variant="filled" />
          <Typography variant="subtitle1">
            inv_speaker
          </Typography>
          <TextField fullWidth id="outlined-basic" label="inv_speaker: Array Object" variant="filled" />
          <Typography variant="subtitle1">
            partner
          </Typography>
          <TextField fullWidth id="outlined-basic" label="Partner: Array Object" variant="filled" />
          <Typography variant="subtitle1">
            committees
          </Typography>
          <TextField fullWidth id="outlined-basic" label="committees: Array Object" variant="filled" />
      </Box>
    </Box>
  );
}

export default HostCreateDash;
