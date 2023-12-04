import {
  Container,
  Typography,
  Box,
  InputLabel,
  Input,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import CardComponent from "../components/ArticleCard";
import SearchIcon from "@mui/icons-material/Search";

const itemOption1 = ["Op1", "Op2", "Op3"];
const itemOption2 = ["Op1", "Op2", "Op3"];

function Article() {
  const [itemOp1, setItemop1] = useState("");
  const [itemOp2, setItemop2] = useState("");

  const handleChange1 = (e) => {
    setItemop1(e.target.value);
  };
  const handleChange2 = (e) => {
    setItemop2(e.target.value);
  };

  return (
    <section>
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" align="center">
          ค้นหาบทความ
        </Typography>
      </Container>
      <Container
        sx={{
          mt: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box>
          <InputLabel>ค้นหาบทความได้ที่นี่</InputLabel>
          <Input
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </Box>
        <Box sx={{display:'flex', mt:2}}>
          <Box sx={{ minWidth: 100, mr: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Tag</InputLabel>
              <Select label="Tag" value={itemOp1} onChange={handleChange1}>
                {itemOption1.map((item1) => (
                  <MenuItem value={item1} key={item1}>
                    {item1}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 100 }}>
            <FormControl fullWidth size="small">
              <InputLabel>หมวดหมู่</InputLabel>
              <Select label="หมวดหมู่" value={itemOp2} onChange={handleChange2}>
                {itemOption2.map((item2) => (
                  <MenuItem value={item2} key={item2}>
                    {item2}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Container>

      <Container sx={{ mt: 5 }}>
        <Typography>บทความล่าสุด</Typography>
        <Box sx={{ mt: 5 }}>
          <CardComponent />
        </Box>
      </Container>
    </section>
  );
}

export default Article;
