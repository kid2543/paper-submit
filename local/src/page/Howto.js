import {
  Container,
  Box,
  Typography,

} from "@mui/material";
import React from "react";
import Downloadfile from "../components/Downloadfile";

function Howto() {
  return (
    <section>
      <Container sx={{height:'100vh'}}>
        <Box>
          <Typography variant="h4" align="center" sx={{ mt: 5 }}>
            วิธีใช้งาน และคู่มือ
          </Typography>
        </Box>
        <Downloadfile text="คู่มือการส่งบทความ"/>
        <Downloadfile text="คู่มือการใช้งานการสร้างประกาศงานประชุม"/>
      </Container>
    </section>
  );
}

export default Howto;
