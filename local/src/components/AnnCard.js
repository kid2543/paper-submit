import React from "react";
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

const testLink = [
    {
        page: 1,
        title: "หัวข้อที่ 1",
        desc:"รายละเอียดงานประชุมวิชาการ"
    },
    {
        page: 2,
        title: "หัวข้อที่ 2",
        desc:"รายละเอียดงานประชุมวิชาการ"
    },
    {
        page: 3,
        title: "หัวข้อที่ 3",
        desc:"รายละเอียดงานประชุมวิชาการ"
    }
];

function AnnCard() {
  return (
    <div style={{display:"flex", justifyContent:"space-between"}}>
        {testLink.map(({page,title,desc}) => 
            <Card>
              <CardMedia
                sx={{ height: 140 , width:300}}
                image={Cover}
                title="ประกาศบทความ"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {desc}
                </Typography>
              </CardContent>
              <CardActions>
              <Link key={page} href={"/ann/" + page} sx={{ textDecoration: 'none' }}>
                <Button size="small">See more</Button>
              </Link>
              </CardActions>
            </Card>
        )}
        
    </div>
    
  );
}

export default AnnCard;
