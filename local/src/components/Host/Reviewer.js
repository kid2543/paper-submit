import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../App.css";
import {
  Button,
  FormGroup,
  Modal,
  Box,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Reviewer() {
  const [reviewer, setReviewer] = useState();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [commit, setCommit] = useState();
  const [topic, setTopic] = useState([]);
  const [pushTopic, setPushTopic] = useState([]);
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [commitTopic, setCommitTopic] = useState();

  const fethReviewer = async () => {
    const getReviwer = await axios.get("/committee");
    setReviewer(getReviwer.data);
  };

  const fethTopic = async () => {
    let topic = await axios.get("/topic");
    setTopic(topic.data);
  };

  const handleOpen = async (id) => {
    const getCommittee = await axios.get("/committees-get/" + id);
    setCommit(getCommittee.data);
    setCommitTopic(new Set(getCommittee.data.topic));
    setPushTopic(getCommittee.data.topic);
    setFname(getCommittee.data.fname);
    setLname(getCommittee.data.lname);
    setOpen(true);
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setPushTopic([...pushTopic, e.target.value]);
    } else {
      setPushTopic(pushTopic.filter((item) => item !== e.target.value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const update = await axios.post("/committees-update/" + commit._id, {
        fname: fname,
        lname: lname,
        topic: pushTopic,
      });
      console.log(update.status);
      alert("Updated")
      setOpen(false)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fethReviewer();
    fethTopic();
  }, []);

  return (
    <div>
      <h2>ข้อมูลกรรมการ</h2>
      <Button variant="contained" sx={{mb:2}} color="success" href="/host/reviewer/create">New Committee</Button>
      {reviewer ? (
        <table>
          <thead>
            <tr>
              <th>อันดับ</th>
              <th>Edit</th>
              <th>ชื่อ-นามสกุล</th>
              <th>username</th>
              <th>ความถนัด</th>
            </tr>
          </thead>
          <tbody>
            {reviewer.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <Button value onClick={() => handleOpen(item._id)}>
                    Edit
                  </Button>
                </td>
                <td>
                  {item.fname} - {item.lname}
                </td>
                <td>{item.username}</td>
                <td>{item.topic.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {commit ? (
            <Box sx={style} component="form" onSubmit={handleSubmit}>
              <h3>แก้ไขกรรมการ: {commit._id}</h3>
              <TextField
                fullWidth
                label="ชื่อ"
                defaultValue={fname}
                onChange={(e) => setFname(e.target.value)}
              />
              <TextField
                fullWidth
                label="นามสกุล"
                defaultValue={lname}
                onChange={(e) => setLname(e.target.value)}
              />
              <FormGroup>
                {topic.map((item) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={item.name}
                        onChange={handleChange}
                        defaultChecked={commitTopic.has(item.name)}
                      />
                    }
                    label={item.name}
                    key={item._id}
                  />
                ))}
              </FormGroup>
              <Button
                fullWidth
                variant="contained"
                color="success"
                type="submit"
                onSubmit={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          ) : (
            <Box sx={style}>
              <h2>Loading...</h2>
            </Box>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default Reviewer;
