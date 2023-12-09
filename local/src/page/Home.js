import React from "react";
import { Typography, Container, Box, Link,Button } from "@mui/material";
import Hero from "../asset/herobanner.jpeg";

function Home() {
  return (
    <div style={{height:'100vh'}}>
      <Box sx={{ display: "flex"}}>
        <section>
        <Container sx={{mt:8}}>
          <Box>
            <Typography variant="h3" gutterBottom>
              <span style={{ color: "#00A5FF" }}>PAPERSS</span>
              <br />
              เว็บไซต์สำหรับรับส่งบทความวิชาการ
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Papers Submission (PAPERSS)
              เป็นเว็บไซต์สำหรับจัดการหน้าเว็บไซต์สำหรับผู้ที่ต้องการสร้างประกาศรับบทความ
              และสำหรับผู้ที่ต้องการส่งบทความวิชาการ
            </Typography>
            <Box sx={{mt:3}}>
              <Link href="/host">
                <Button variant="contained" sx={{mr:2}}>สร้างงานประชุม</Button>
              </Link>
              <Link href="/ann">
                <Button variant="outlined">ส่งบทความ</Button>
              </Link>
            </Box>
          </Box>
        </Container>
        </section>
        <Box sx={{mt:8}}>
          <img src={Hero} alt="Hero Banner" style={{height:"100%", maxWidth:600}} />
        </Box>
      </Box>
    </div>
  );
}

export default Home;
