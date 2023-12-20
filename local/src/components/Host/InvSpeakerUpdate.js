import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Modal,
  Box,
  Typography,
  TextField,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function InvSpeakerUpdate() {
  const { id } = useParams();
  const [state, setState] = useState(false);
  const [temp, setTemp] = useState([]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState();
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fethData = async () => {
      try {
        const data = await axios.get("/conferences-get/" + id);
        setTemp(data.data.inv_speaker);
        setState(true);
      } catch (error) {}
    };
    fethData();
  }, []);

  const handleEdit = (index) => {
    setEdit(temp[index]);
  };

  console.log(temp);

  return (
    <div>
      <h2>Update รายชื่อพิธีกร</h2>
      {state ? (
        <List>
          {temp.map((item, index) => (
            <div key={index}>
              <ListItem >
                <TextField label="ชื่อพิธีกร" defaultValue={item.name} />
                <TextField label="ชื่อพิธีกร" defaultValue={item.name} />
                <TextField label="ชื่อพิธีกร" defaultValue={item.name} />
                <TextField label="ชื่อพิธีกร" defaultValue={item.name} />
                <TextField label="ชื่อพิธีกร" defaultValue={item.name} />
              </ListItem>
              <Button fullWidth>Delete</Button>
            </div>
          ))}
        </List>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default InvSpeakerUpdate;
