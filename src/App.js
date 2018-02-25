import React, {Component} from "react";
import Header from "./components/Header";
import Grid from 'material-ui/Grid';

export default class App extends Component {
  render() {
    return (<div>
      <Header/>
      <Grid container spacing={0}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          {this.props.children}
        </Grid>
        <Grid item xs={2}>
        </Grid>
      </Grid>
      </div>
    );
  }
}
