import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Toolbar,
  IconButton,
  Drawer,
  Link,
} from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useParams } from "react-router-dom";

const drawerWidth = 240;

function AnnMockPage(props) {
  const params = useParams();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{p:2}}>
      <Link variant="h5" href="/">
        PAPERSS
      </Link>
      </Box>
 
      <Divider />
      <List>
        <ListItem>
          <Link href={"/ann/" + params.id}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Home" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={"/ann/" + params.id + "/call-for-paper"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="Call for paper" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={"/ann/" + params.id + "/comiittees"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="comiittees" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={"/ann/" + params.id + "/author-guideline"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="author-guideline" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={"/ann/" + params.id + "/program"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="program" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={"/ann/" + params.id + "/registration"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="registration" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={"/ann/" + params.id + "/tutorials"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="tutorials" />
            </ListItemButton>
          </Link>
        </ListItem>
        <ListItem>
          <Link href={"/ann/" + params.id + "/venue"}>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary="venue" />
            </ListItemButton>
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
    </Box>
  );
}

export default AnnMockPage;
