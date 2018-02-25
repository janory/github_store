import React, { Component } from "react";
import AppBar from "material-ui/AppBar";

import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";

export default class Header extends Component {
  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit">
            GitHub Store
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
