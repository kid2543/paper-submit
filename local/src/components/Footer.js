import { Typography, Box, Link, Container } from "@mui/material";
import React from "react";
import Icon from "../asset/logo-text.png";

//icon
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <footer style={{ left: 0, bottom: 0, width: "100%", height: 100}}>
      <hr />
      <Container sx={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
        <Box>
          <img src={Icon} alt="Footer" style={{ width: 200 }} />
        </Box>
        <Box>
          <ul style={{display:'flex', width:200, justifyContent:'space-between'}}>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="https:www.google.com">Google</Link>
            </li>
          </ul>
        </Box>
        <Box>
          <ul style={{ display: "flex",width:120, justifyContent:'space-between'}}>
            <li>
              <FacebookIcon />
            </li>
            <li>
              <InstagramIcon />
            </li>
            <li>
              <GitHubIcon />
            </li>
          </ul>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
