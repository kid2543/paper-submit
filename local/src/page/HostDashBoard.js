//mui
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

//react and format
import React, { useEffect, useState } from "react";
import axios from 'axios'
import Cookies from 'universal-cookie'

//icon
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


function HostDashBoard() {

  const cookies = new Cookies();
  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState([])
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = (e) => {
    console.log("Update")
  }

  const handleDel = () => {
    console.log("Del")
  }

  useEffect(() => {
    let owner = cookies.get('token')
    axios.post('/conferences/user',{owner:owner})
    .then(res => {
      setData(res.data)
    })
    .catch(err => console.log(err))
  })

  return (
    <div>
      <Box sx={{ my: 5 }}>
        <Typography variant="h4">รายการงานประชุม</Typography>
      </Box>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="right">Owner</TableCell>
                <TableCell align="right">Tools</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((datas) => (
                <TableRow
                  key={datas._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {datas.title}
                  </TableCell>
                  <TableCell align="right">{datas.owner}</TableCell>
                  <TableCell align="right">
                    <Button
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                      sx={{m:0 , p:0}}
                    >
                      <ArrowDropDownIcon />
                    </Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        "aria-labelledby": "basic-button",
                      }}
                    >
                      <MenuItem data="Hello" onClick={handleUpdate}><EditIcon sx={{mr:1}} />EDIT</MenuItem>
                      <MenuItem onClick={handleDel}><DeleteIcon sx={{mr:1}} />DELETE</MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default HostDashBoard;
