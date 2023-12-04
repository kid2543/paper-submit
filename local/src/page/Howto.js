import {
  Container,
  Button,
  Box,
  Typography,
  Grid,
  styled,
} from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";
import Downloadfile from "../components/Downloadfile";

const ItemBox = styled(Grid)(({theme}) => ({
   textAlign:"center",
   padding:theme.spacing(1)
}))

function Howto() {
  const handleDownload = () => {
    alert("Downloading");
  };
  return (
    <section>
      <Container>
        <Box>
          <Typography variant="h4" align="center" sx={{ mt: 5 }}>
            วิธีใช้งาน และคู่มือ
          </Typography>
        </Box>
        <Grid container spacing={2} sx={{ alignItems: "center" }}>
          <Grid item xs={6}>
            <ItemBox>
              <Typography>คู่มือวิธีใช้งานการค้นหาบทความ</Typography>
            </ItemBox>
          </Grid>
          <Grid item xs={6}>
            <ItemBox>
              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
              >
                Download
              </Button>
            </ItemBox>
          </Grid>
        </Grid>
        <Downloadfile text="คู่มือการใช้งานการสร้างประกาศงานประชุม"/>
      </Container>
    </section>
  );
}

export default Howto;
