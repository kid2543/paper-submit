import React, { useState } from "react";
import {
  SwipeableDrawer,
  Button,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Container,
} from "@mui/material";

//import icon
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Outlet } from "react-router-dom";

function AuthorDashboard() {
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
          <Typography align="center" variant="h4" sx={{ mt: 5 }}>
            PAPERSS
          </Typography>
          <List sx={{ width: 400 }}>
            <ListItemButton component="a" href="/author/dashboard/">
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="รายการบทความ" />
            </ListItemButton>
            <ListItemButton component="a" href="/author/dashboard/send">
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <ListItemText primary="ส่งบทความ" />
            </ListItemButton>
          </List>
        </SwipeableDrawer>
      </Container>
      <Container sx={{my:5}}>
        <Outlet />
      </Container>
    </div>
  );
}

export default AuthorDashboard;
