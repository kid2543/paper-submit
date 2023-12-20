import { TextField, Button, Modal, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import axios from "axios";
import { useParams } from "react-router-dom";

//icon
import SaveIcon from "@mui/icons-material/Save";

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

function DateUpdate() {
  const { id } = useParams();
  const [name, setName] = useState();
  const [getDate, setDate] = useState();
  const [temp, setTemp] = useState([]);  

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
                    setTemp(temp.filter((item,index_in) => index_in !== temp[index]))
                    console.log("Deleted")
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

  //

  const handleUpdate = async () => {
    try {
      await axios.put("/conferences-update/" + id, {important_date:temp})
      console.log("Updated")
    } catch (error) {
        console.log(error)
    }
  };

  const addItem = () => {
    setTemp([...temp, { name: name, date: getDate }]);
    console.log("ADD item");
  };

  useEffect(() => {
    const fethDate = async () => {
      try {
        const getConfr = await axios.get("/conferences-get/" + id);
        setTemp(getConfr.data.important_date);
      } catch (error) {
        console.log(error);
      }
    };
    fethDate();
  }, [id]);
  return (
    <div>
      <h2>Important date Update</h2>
      <div>
        <TextField
          label="ใส่ชื่อวัน"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="date"
          name="วันที่"
          onChange={(e) => setDate(e.target.value)}
        />
        {temp ? (
          <ul>
            {temp.map((item, index) => (
              <li key={index}>
                ชื่อ: {item.name} <br />
                วันที่: {item.date}
                <Button onClick={() => handleDel(index)}>Del</Button>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Loading</h2>
        )}
        <Button onClick={addItem} variant="contained">
          Add
        </Button>
        <Button onClick={handleUpdate}>
          <SaveIcon />
        </Button>
      </div>
    </div>
  );
}

export default DateUpdate;
