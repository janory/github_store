import React, { Component } from "react";
import List, { ListItem, ListItemText } from 'material-ui/List';
import { connect } from "react-redux";

const mapStateToProps = state => ({
  username: state.user.username,
  repositories: state.user.repositories
});

const mapDispatchToProps = dispatch => ({
});

class RepoListView extends Component {
  render() {
    const repos = this.props.repositories.map(repos => <li>{repos.name}</li>);

    return (
      <div>
        <h1>{this.props.username}</h1>
        <ul>
          {repos}
        </ul>
      </div>
    );
  }
}

export default connect(mapStateToProps ,mapDispatchToProps)(RepoListView)
