import React from "react";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import "./Header.css";

const Header = () => {
  return (
    <AppBar position="static" className="header">
      <Toolbar>
        <Typography variant="title" color="inherit">
          GitHub Store
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
