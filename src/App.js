import React, { Component } from "react";
import Header from "./components/Header";
import Grid from "material-ui/Grid";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Grid className="wrapper" container alignItems="stretch" spacing={0}>
          <Grid item xs={2} />
          <Grid className="content" item xs={8}>
            {this.props.children}
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </div>
    );
  }
}
