import React, {useState} from 'react'
import {
  SwipeableDrawer,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
  Link,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateIcon from '@mui/icons-material/Create';
import { Outlet } from "react-router-dom";

function Host() {

  const [state, setState] = useState(false);

  const toggleDrawer = () => {
    setState(!state);
    console.log(state);
  };
  return (
    <div>
      <Container sx={{my:5}}>
        <Button
          variant="outlined"
          onClick={toggleDrawer}
          startIcon={<ArrowForwardIcon />}
        >
          Tools
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={state}
          onClose={toggleDrawer}
          onOpen={toggleDrawer}
        >
          <Link href="/">
          <Typography align="center" variant="h4" sx={{ mt: 5 }}>
            PAPERSS
          </Typography>
          </Link>
          <List sx={{ width: 400 }}>
            <ListItemButton component="a" href="/host">
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="รายการงานประชุม" />
            </ListItemButton>
            <ListItemButton component="a" href="/host/create">
              <ListItemIcon>
                <CreateIcon />
              </ListItemIcon>
              <ListItemText primary="สร้างงานประชุม" />
            </ListItemButton>
          </List>
        </SwipeableDrawer>
      </Container>
      <Container>
        <Outlet />
      </Container>
    </div>
  )
}

export default Host