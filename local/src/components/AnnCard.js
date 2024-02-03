import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Link,
} from "@mui/material";
import Cover from '../asset/cover.jpg'
import axios from "axios";

function AnnCard() {

  const [data, setData] = useState([]);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fethConfr = async () => {
      setLoading(false)
      const getConfr = await axios.get("/conferences")
      setData(getConfr.data)
      setLoading(true)
    }
    fethConfr();
  },[])

  console.log(data)

  return (
    <div>
      {loading ? (
        <div style={{display:"flex", justifyContent:'space-around'}}>
        {data.map((item) => 
            <Card key={item._id} sx={{maxWidth:320}}>
              <CardMedia
                sx={{ height: 200 , width:320}}
                image={Cover}
                title="ประกาศบทความ"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.confr_desc}
                </Typography>
              </CardContent>
              <CardActions>
              <Link key={item._id} href={"/ann/" + item._id} sx={{ textDecoration: 'none' }}>
                <Button size="small">See more</Button>
              </Link>
              </CardActions>
            </Card>
        )}
        
    </div>
      ):(<h2>Loading...</h2>)}
    </div>
    
    
  );
}

export default AnnCard;
