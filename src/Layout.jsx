import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  Typography,
  Box,
} from "@mui/material";
import UploadBook from "./UploadBook";
import Library from "./Library";
import Dashboard from "./Dashboard";
import Notes from "./Notes";
import Flashcards from "./Flashcards";

import { CloudUpload, LibraryBooks, Dashboard as DashboardIcon } from "@mui/icons-material";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import StyleIcon from "@mui/icons-material/Style";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";




function Layout({ user }) {
  const [view, setView] = useState("upload");
  const drawerWidth = 240;

  return (
    <Box sx={{ display: "flex" }}>
      {/* Top bar */}
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Hamixa — Study Platform
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <List>
          <ListItem button onClick={() => setView("upload")}>
            <ListItemIcon><CloudUploadIcon /></ListItemIcon>
            <ListItemText primary="Upload Book" />
          </ListItem>

          <ListItem button onClick={() => setView("library")}>
            <ListItemIcon><LibraryBooks /></ListItemIcon>
            <ListItemText primary="My Library" />
          </ListItem>

          <ListItem button onClick={() => setView("dashboard")}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>

          <ListItem button onClick={() => setView("notes")}>
            <ListItemIcon><NoteAltIcon /></ListItemIcon>
            <ListItemText primary="Notes" />
          </ListItem>

          <ListItem button onClick={() => setView("flashcards")}>
           <ListItemIcon><StyleIcon /></ListItemIcon>
           <ListItemText primary="Flashcards" />
          </ListItem>
        </List>
      </Drawer>

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {view === "upload" && <UploadBook user={user} />}
        {view === "library" && <Library user={user} />}
        {view === "dashboard" && <Dashboard user={user} />}
        {view === "notes" && <Notes user={user} />}
        {view === "flashcards" && <Flashcards user={user} />}

      </Box>
    </Box>
  );
}

export default Layout;
