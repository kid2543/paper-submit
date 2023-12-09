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
import React, { useState } from "react";
import { format, addDays } from "date-fns";

//icon
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

//test format date
const testDate = new Date();
const getDate = format(testDate, "dd/MM/yyyy");
const moreDate = (time, data) => {
  time = addDays(time, 30);
  data = format(time, "dd/MM/yyyy");
  return data;
};

//test
console.log(getDate);

const number = [10,20]

//mock up data
const mockData = [
  {
    title: "หัวข้องานประชุม 1",
    start_date: `${getDate}`,
    end_date: `${moreDate(testDate)}`,
    number_paper: number[0]
  },
  {
    title: "หัวข้องานประชุม 2",
    start_date: `${getDate}`,
    end_date: `${moreDate(testDate)}`,
    number_paper: number[1]
  },
];


function HostDashBoard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (text) => {
    setAnchorEl(null);
  };

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
                <TableCell align="right">Start Date</TableCell>
                <TableCell align="right">End Date</TableCell>
                <TableCell align="right">All</TableCell>
                <TableCell align="right">Tools</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockData.map((mock) => (
                <TableRow
                  key={mock.title}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {mock.title}
                  </TableCell>
                  <TableCell align="right">{mock.start_date}</TableCell>
                  <TableCell align="right">{mock.end_date}</TableCell>
                  <TableCell align="right">{mock.number_paper}</TableCell>
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
                      <MenuItem onClick={handleClose}><EditIcon sx={{mr:1}} />EDIT</MenuItem>
                      <MenuItem onClick={handleClose}><DeleteIcon sx={{mr:1}} />DELETE</MenuItem>
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
