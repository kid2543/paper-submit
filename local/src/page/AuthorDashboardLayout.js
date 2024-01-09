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
  Link,
} from "@mui/material";

//import icon
import DescriptionIcon from "@mui/icons-material/Description";
import SendIcon from "@mui/icons-material/Send";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Outlet, useParams } from "react-router-dom";

function AuthorDashboard() {
  const [state, setState] = useState(false);
  const {id} = useParams();

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
            <ListItemButton component="a" href={"/author/dashboard/"+id}>
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="รายการบทความ" />
            </ListItemButton>
            <ListItemButton component="a" href={"/author/dashboard/" + id + "/send"}>
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
