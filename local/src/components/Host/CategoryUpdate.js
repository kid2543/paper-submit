import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";

//icon
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";

function CategoryUpdate() {
    const navigate = useNavigate();
  const {id} = useParams();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleUpdate = async () => {
    try {
        await axios.put("/conferences-update/" + id, {topic:category});
        alert("Data is Updated")
        navigate(-1)
    } catch (error) {
        console.log(error)
    }
  };

  useEffect(() => {
    const fethData = async () => {
      try {
        const Data = await axios.get("/category");
        setData(Data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fethData();
  });

  return (
    <form>
      <h2>Update Category</h2>

      {data ? (
        <FormControl sx={{ m: 1, minWidth: "200px" }}>
          <InputLabel id="label-category">เลือกหัวข้อที่ต้องการ</InputLabel>
          <Select
            labelId="label-category"
            label="เลือกหัวข้อที่ต้องการ"
            value={category}
            onChange={handleChange}
            multiple
          >
            {data.map((item) => (
              <MenuItem key={item._id} value={item.c_code}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <Button variant="contained" onClick={handleUpdate}>
            <SaveIcon />
          </Button>
        </FormControl>
      ) : (
        <h2>Loading</h2>
      )}
    </form>
  );
}

export default CategoryUpdate;
