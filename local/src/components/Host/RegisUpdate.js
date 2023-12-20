import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  FormControl,
  Box,
  Modal,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { confirmAlert } from "react-confirm-alert";

//icon
import SaveIcon from '@mui/icons-material/Save';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function RegisUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useState(false);
  const [remark , setRemark] = useState();
  const [bankName ,setBankName] = useState();
  const [acName, setAcName] = useState();
  const [acType, setAcType] = useState();
  const [acNo, setAcNo] = useState();
  const [Rdate, setRdate] = useState();
  const [Edate, setEdate] = useState();
  const [type,setType] = useState([]);
  const [typeName, setTypeName] = useState();
  const [typeP1, setTypeP1] = useState();
  const [typeP2, setTypeP2] = useState();

  useEffect(() => {
    const fethData = async () => {
      try {
        const getData = await axios.get("/conferences-get/" + id);
        setEdate(moment(getData.data.regis.early_bird_date).format(
          "YYYY-MM-DD"
        ))
        setRdate(moment(getData.data.regis.regular_date).format(
          "YYYY-MM-DD"
        ))
        setRemark(getData.data.regis.remark);
        setBankName(getData.data.regis.bank_name);
        setAcName(getData.data.regis.ac_name);
        setAcType(getData.data.regis.ac_type);
        setAcNo(getData.data.regis.ac_no);
        setType(getData.data.regis.regis_type);
        setState(true);
      } catch (error) {
        console.log(error);
      }
    };
    fethData();
  }, [id,state]);

  const addItem = () => {
    setType([...type, { name: typeName, price_1: typeP1, price_2: typeP2}]);
    console.log("ADD item");
  };

  const handleDel = (index) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
            <Modal
              open
              onClose={onClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  ต้องการจะลบจริงหรือไม่ ?
                </Typography>
                <Button onClick={() => {
                    setType(type.filter((item,index_filter) => index_filter  !== index))
                    console.log("Delete: " + type[index].name)
                    onClose()
                }}>
                    Yes
                </Button>
                <Button onClick={() => onClose()}>
                    No
                </Button>
              </Box>
            </Modal>
        );
      },
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/conferences-update/" + id, {regis:{remark:remark,early_bird_date:Edate,regular_date:Rdate,bank_name:bankName,ac_name:acName,ac_type:acType,ac_no:acNo,regis_type:type}})
      console.log("Updated id: " + id)
      navigate(-1);
    } catch (error) {
        console.log(error)
    }
  };



  return (
    <form onSubmit={handleUpdate}>
      <h2>Update การลงทะเบียน</h2>
      {state ? (
        <div>
          <FormControl fullWidth>
            <TextField label="ชื่อธนาคาร" defaultValue={bankName} onChange={(e) => setBankName(e.target.value)}/>
            <TextField label="ชื่อบัญชี" defaultValue={acName} onChange={(e) => setAcName(e.target.value)} />
            <TextField label="ประเภทบัญชี" defaultValue={acType} onChange={(e) => setAcType(e.target.value)} />
            <TextField label="เลขบัญชี" defaultValue={acNo} onChange={(e) => setAcNo(e.target.value)} />
            <TextField label="รายละเอียดเพิ่มเติม" defaultValue={remark} onChange={(e) => setRemark(e.target.value)} />
          </FormControl>
          <div>
            <label>วันที่ลงทะเบียนแบบ Early Bird</label>
            <input type="date" defaultValue={Edate} onChange={(e) => setEdate(e.target.value)} />
          </div>
          <div>
            <label>วันที่ลงทะเบียนแบบ Regular</label>
            <input type="date" defaultValue={Rdate} onChange={(e) => setRdate(e.target.value)}/>
          </div>
          <div>
            <p>ประเภทการลงทะเบียน</p>
            <TextField label="ชื่อ" onChange={(e) => setTypeName(e.target.value)}/>
            <TextField label="ค่าใช้จ่ายประเภท Early Bird" onChange={(e) => setTypeP1(e.target.value)} />
            <TextField label="ค่าใช้จ่ายประเภท Regular" onChange={(e) => setTypeP2(e.target.value)} />
            <Button onClick={addItem}>Add</Button>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>ชื่อประเภท</TableCell>
                    <TableCell align="right">Early Bird</TableCell>
                    <TableCell align="right">Regular</TableCell>
                    <TableCell align="right">Tool</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody> 
                  {type.map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-   th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.price_1}</TableCell>
                      <TableCell align="right">{row.price_2}</TableCell>
                      <TableCell align="right">
                        <Button color="error" onClick={() => handleDel(index)}>Del</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Button type="submit" onSubmit={handleUpdate} variant="contained"><SaveIcon/></Button>
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </form>
  );
}

export default RegisUpdate;
