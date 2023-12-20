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
  Button
} from "@mui/material";

//react and format
import React, {  useEffect, useState } from "react";
import axios from 'axios'
import Cookies from 'universal-cookie'
import {useNavigate} from 'react-router-dom'

//icon



function HostDashBoard() {

  const navigate = useNavigate();
  const cookies = new Cookies();
  const [data, setData] = useState([])
    
  function handleUpdate(value) {
    navigate("/host/"+ value)
  }

  function handleDel(value) {
    console.log(value)
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
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell align="right">Owner</TableCell>
                <TableCell align="right">Code</TableCell>
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
                    {datas._id}
                  </TableCell>
                  <TableCell>{datas.title}</TableCell>
                  <TableCell align="right">{datas.owner}</TableCell>
                  <TableCell align="right">{datas.confr_code}</TableCell>
                  <TableCell align="right">
                    <Button variant="outlined" sx={{mr:1}} onClick={() => handleUpdate(datas._id)}>Edit</Button>
                    <Button color="error" onClick={() => handleDel(datas._id)}>DELETE</Button>
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
