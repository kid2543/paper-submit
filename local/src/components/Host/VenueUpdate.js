import { Box, Typography, Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function VenueUpdate() {
  const { id } = useParams();
  const [data, setData] = useState();
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [remark, setRemark] = useState();
  const [image, setImage] = useState();
  const [link, setLink] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getData = await axios.get("/conferences-get/" + id);
        setData(getData.data.venue)
        setName(getData.data.venue.name)
        setDesc(getData.data.venue.desc)
        setRemark(getData.data.venue.remark)
        setLink(getData.data.venue.travel)
        setImage(getData.data.venue.img)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        await axios.post("/venue-update/" +id, {
            name:name,
            remark:remark,
            desc:desc,
            travel:link,
            image:image
        })
        console.log("Success")
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div>
      <h2>รายละเอียดสถานที่จัดงาน</h2>
      {data ? (
        <Box component="form" onSubmit={handleUpdate}>
          <TextField label="ชื่อสถานที่จัดงาน" defaultValue={name} onChange={(e) => setName(e.target.value)}/>
          <TextField label="รายละเอียดสถานที่" defaultValue={desc} onChange={(e) => setDesc(e.target.value)} />
          <TextField label="รายละเอียดเพิ่มเติม" defaultValue={remark} onChange={(e) => setRemark(e.target.value)} />
          <TextField label="Link สถานที่ท่องเที่ยว" defaultValue={link} onChange={(e) => setLink(e.target.value)} />
          <Button type="submit" onSubmit={handleUpdate}>
            Update
          </Button>
        </Box>
      ) : (
        <h2>Loading....</h2>
      )}
    </div>
  );
}

export default VenueUpdate;
