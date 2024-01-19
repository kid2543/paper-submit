//mui
import {
  Box,
  Typography,
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
    
  function handleUpdate(id) {
    navigate("/host/"+ id)
  }

  function handleAssign(id) {
    navigate("/host/"+ id + "/view")
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
  },[])

  return (
    <div>
      <Box sx={{ my: 5 }}>
        <Typography variant="h4">รายการงานประชุม</Typography>
      </Box>
      <Box>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Owner</th>
                <th>Code</th>
                <th>Tools</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datas) => (
                <tr
                  key={datas._id}
                >
                  <td>
                    {datas._id}
                  </td>
                  <td>{datas.title}</td>
                  <td >{datas.owner}</td>
                  <td >{datas.confr_code}</td>
                  <td >
                    <Button variant="outlined" sx={{mr:1}} onClick={() => handleUpdate(datas._id)}>Edit</Button>
                    <Button variant="outlined" sx={{mr:1}} onClick={() => handleAssign(datas._id)}>assign</Button>
                    <Button color="error" onClick={() => handleDel(datas._id)}>DELETE</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </Box>
    </div>
  );
}

export default HostDashBoard;
