import { Box, Button, TextField, Modal, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function PublicUpdate() {
  const { id } = useParams();
  const [pub, setPub] = useState([]);
  const [pubName, setPubName] = useState(null);

  async function fethPublic() {
    const getPublic = await axios.get("/conferences-get/" + id);
    setPub(getPublic.data.publication);
  }

  function addItem() {
    if (pubName !== null) {
      setPub([...pub, pubName]);
      setPubName(null);
      document.getElementById("text-form").value = "";
    } else {
      alert("โปรดระบุชื่อ");
    }
  }

  async function UpdateItem() {
    try {
      await axios.put("/conferences-update/" + id, { pub: pub });
      alert("Update success");
    } catch (error) {
      console.log(error);
    }
  }

  function DelItem(index) {
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
              <h5 id="modal-modal-title" variant="h6" component="h2">
                ต้องการจะลบจริงหรือไม่ ?
              </h5>
              <Button
                onClick={() => {
                  setPub(pub.filter((item) => item !== pub[index]));
                  console.log("Deleted");
                  onClose();
                }}
              >
                Yes
              </Button>
              <Button onClick={() => onClose()}>No</Button>
            </Box>
          </Modal>
        );
      },
    });
  }

  useEffect(() => {
    fethPublic();
  }, []);

  console.log();

  return (
    <div>
      <h2>เพิ่มสำนักพิมพ์</h2>
      <Box component="form">
        <TextField
          fullWidth
          label="ชื่อสำนักพิมพ์"
          onChange={(e) => setPubName(e.target.value)}
          id="text-form"
        />
        <Box>
          <Button fullWidth variant="outlined" onClick={addItem}>
            Add
          </Button>
        </Box>
      </Box>
      <h2>แก้ไขชื่อสำนักพิมพ์</h2>
      <Box>
      <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            อันดับ
                        </TableCell>
                        <TableCell>
                            ชื่อ
                        </TableCell>
                        <TableCell align="right">
                            ลบ
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {pub.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>
                            {index}
                        </TableCell>
                        <TableCell>
                            {item}
                        </TableCell>
                        <TableCell align="right">
                        <Button variant="outlined" onClick={() => DelItem(index)}>Del</Button>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          </TableContainer>
        
        <Button fullWidth variant="outlined" onClick={UpdateItem}>
          Save
        </Button>
      </Box>
    </div>
  );
}

export default PublicUpdate;
