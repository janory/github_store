import React, { Component } from "react";
import List, { ListItem, ListItemText } from 'material-ui/List';
import { connect } from "react-redux";

const mapStateToProps = state => ({
  username: state.user.username
});

const mapDispatchToProps = dispatch => ({
});

class RepoListView extends Component {

  render() {
    return (
      <h1>{this.props.username}</h1>

    );
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(RepoListView)
