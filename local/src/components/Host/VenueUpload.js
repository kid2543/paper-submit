import { Box, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

function VenueUpload() {

    const {id} = useParams();
    const [data, setData] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        const fetchData = async () => {
            const getData = await axios.get("/conferences-get/" + id)
            setData(getData.data.venue)
        }
        fetchData();
    },[])

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("name",data.name)
        formData.append("desc",data.desc)
        formData.append("remark",data.remark)
        formData.append("travel",data.travel)
        formData.append("image",image)
        await axios.post("/venue-upload-img/" + id, formData)
        console.log("Success")
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <Box component="form" onSubmit={handleUpload}>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <Button type="submit" onSubmit={handleUpload}>
          Upload
        </Button>
      </Box>
    </div>
  );
}

export default VenueUpload;
