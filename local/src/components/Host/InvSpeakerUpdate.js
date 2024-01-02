import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  TextField,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  TableBody,
  Table,
  Paper
} from "@mui/material";
//component
import ModalComponent from "../ModalText";
import ModalUploadImage from "../ModalUploadimage";
import ModalUploadCv from "../ModalUploadCV";
//icon
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function InvSpeakerUpdate() {
  const { id } = useParams();
  const [state, setState] = useState(false);
  const [temp, setTemp] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [keynote, setKeynote] = useState();
  const [open, setOpen] = useState(false);
  const [openImage, setOpenImage] = useState(false);
  const [openCV, setOpenCV] = useState(false);
  const [inv , setInv] = useState([]);
  const [invId, setId] = useState();

  useEffect(() => {
    const fethData = async () => {
      const getData = await axios.get("/conferences-get/" + id);
      const getInv = await axios.post("/inv-speaker-get", {confr_code: getData.data.confr_code})
      setTemp(getData.data);
      setInv(getInv.data)
      setState(true)
    };
    fethData();
  }, [id,temp]);

  const createInv = async () => {
    try {
      const createData = await axios.post("/create/inv-speaker", {name:name,desc:desc,keynote:keynote,confr_code:temp.confr_code})
      console.log(createData)
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <div>
      <h2>Create รายชื่อพิธีกร</h2>
      <TextField label="name" onChange={(e) => setName(e.target.value)} />
      <TextField label="desc" onChange={(e) => setDesc(e.target.value)} />
      <TextField label="keynote" onChange={(e) => setKeynote(e.target.value)} />
      <Button onClick={createInv}>Create</Button>
      {state ? (
        <div>
          <h2>Update รายชื่อพิธีกร</h2>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">CV</TableCell>
            <TableCell align="right">Tool</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {inv.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">
                <img width={80} src={"/image/" + row.img} alt={row.img} />
              </TableCell>
              <TableCell align="right">
                <a href={"http://localhost:4000/pdf/" + row.cv} target="_blank" rel="noreferrer">View</a>
              </TableCell>
              <TableCell align="right"><Button onClick={() => {
                setOpen(true)
                setId(row._id)
              }}><EditIcon/></Button>
              <Button onClick={() => {
                setOpenCV(true)
                setId(row._id)
              }}><PictureAsPdfIcon/></Button>
              <Button onClick={() => {
                setOpenImage(true)
                setId(row._id)
              }}><ImageIcon/></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <ModalComponent openState={open} onClose={() => setOpen(false)} id={invId} />
    <ModalUploadImage openState={openImage} onClose={() => setOpenImage(false)} id={invId} />
    <ModalUploadCv openState={openCV} onClose={() => setOpenCV(false)} id={invId} />
        </div>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default InvSpeakerUpdate;
