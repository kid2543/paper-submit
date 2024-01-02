import { Box, Button } from "@mui/material";
import axios from "axios";
import React,{useState} from "react";
import { useParams } from "react-router-dom";

function ScheduleUpload() {
  const { id } = useParams();
  const [pdf, setPdf] = useState();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", pdf);
      await axios.post("/schedule-upload/" + id,formData);
      console.log("Success")
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <h2>Upload Schedule</h2>
      <Box component="form" onSubmit={handleUpload}>
        <input accept="application/pdf" type="file" onChange={(e) => setPdf(e.target.files[0])} />
        <Button type="submit" onSubmit={handleUpload}>
          Upload
        </Button>
      </Box>
    </div>
  );
}

export default ScheduleUpload;
