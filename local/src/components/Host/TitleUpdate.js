import { FormControl, TextField,Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";

//icon
import SaveIcon from '@mui/icons-material/Save';


function TitleUpdate() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [title, setTitle] = useState();
    const [data, setData] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
          .put("/conferences-update/" + id, {
            //data ที่จะเอาเข้าไป
            title: title
          })
          .then((res) => {
            console.log("Title is Update" + res.data.title)
            navigate(-1);
          })
          .catch((err) => console.log(err));
      };

    useEffect(() => {
        const fetchData = async () => {
            try {
              const data = await axios.get("/conferences-get/" + id);
              setData(data.data);
            } catch (error) {
              console.log(error);
            }
          };
          fetchData();
    },[id,title])

  return (
    <form onSubmit={handleSubmit}>
        <FormControl>
            {data ? (
            <div>
                <TextField defaultValue={data.title} label="Title" onChange={(e) => setTitle(e.target.value)}/>
                <Button type="submit" onSubmit={handleSubmit}><SaveIcon/></Button>
            </div>
            ):(<h2>Loading....</h2>)}
            
        </FormControl>
    </form>
  )
}

export default TitleUpdate