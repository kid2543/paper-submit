import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

//icon


function CategoryUpdate() {

  const {id} = useParams();
  const [data, setData] = useState();

  const fethCategory = async () => {
    try {
      const getCode = await axios.get('/category-for-confr/' + id)
      setData(getCode.data)
    } catch (error) {
      console.log(error)
    }
    
  }
  useEffect(() => {
    fethCategory();
  },[])

  return (
    <div>
      <h2>Update Category</h2>
        <Button variant='contained' href={"/host/" + id + "/category/new"}>เพิ่มหัวข้อใหม่</Button>
      <div>
        {data ? (
          <div>
            {data.map((item,index) => (
              <div key={item._id}>
                <h1>หัวข้อที่: {index + 1}</h1>
                <p>ชื่อ: <span>{item.name}</span></p>
                <p>คำอธิบาย: <span>{item.desc}</span></p>
                <p>Code หัวข้อ: <span>{item.category_code}</span></p>
                <p>Topic: <span>{item.topic}</span></p>
                <hr/>
              </div>
            ))}
          </div>
        ): (
          <h2>No data</h2>
        )}
      </div>
    </div>
  );
}

export default CategoryUpdate;
