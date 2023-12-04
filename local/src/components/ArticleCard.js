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

const testLink = ["1", "2", "3"];

function CardComponent() {
  return (
    <div style={{display:"flex", justifyContent:"space-between"}}>
        {testLink.map(link => 
            <Link key={link} href={"/article/" + link} sx={{ textDecoration: 'none' }}>
            <Card>
              <CardMedia
                sx={{ height: 140 , width:300}}
                image="/static/images/cards/contemplative-reptile.jpg"
                title="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  ชื่อบทความ
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  รายละเอียดบทความ
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">See more</Button>
              </CardActions>
            </Card>
          </Link>
        )}
        
    </div>
    
  );
}

export default CardComponent;
