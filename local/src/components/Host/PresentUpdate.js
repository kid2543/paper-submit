import { Button, TextField, Modal, Box, Typography } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

//icon
import SaveIcon from "@mui/icons-material/Save";

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

function PresentUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState();
  const [title, setTitle] = useState();
  const [detail, setDetail] = useState();
  const [temp, setTemp] = useState([]);
  const [remark, setRemark] = useState();

  const addItem = () => {
    setTemp([...temp, detail]);
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
              <Button
                onClick={() => {
                  setTemp(
                    temp.filter((item, index_filter) => index_filter !== index)
                  );
                  console.log(temp[index] + " Deleted");
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
  };

  useEffect(() => {
    const fethData = async () => {
      try {
        const result = await axios.get("/conferences-get/" + id);
        setData(result.data.presentation_guide);
        setTemp(result.data.presentation_guide.detail);
        setTitle(result.data.presentation_guide.header);
        setRemark(result.data.presentation_guide.remark);
      } catch (error) {
        console.log(error);
      }
    };
    fethData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put("/conferences-update/" + id, {
        present: { header: title, detail: temp, remark: remark },
      });
      console.log("Updated");
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {data ? (
        <form onSubmit={handleUpdate}>
          <h2>Update แนวทางการนำเสนอผลงาน</h2>
          <TextField
            defaultValue={data.header}
            label="หัวข้อ"
            onChange={(e) => setTitle(e.target.value)}
          />
          <div>
            <TextField
              lable="รายละเอียด"
              onChange={(e) => setDetail(e.target.value)}
            />
            <Button onClick={addItem}>Add</Button>
            <ul>
              {temp.map((item, index) => (
                <li key={index}>
                  {item}
                  <Button
                    onClick={() => {
                      handleDel(index);
                    }}
                  >
                    Del
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <TextField
              fullWidth
              multiline
              defaultValue={data.remark}
              label="รายละเอียดเพิ่มเติม"
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
          <Button type="submit">
            <SaveIcon />
          </Button>
        </form>
      ) : (
        <h2>Loading</h2>
      )}
    </div>
  );
}

export default PresentUpdate;
