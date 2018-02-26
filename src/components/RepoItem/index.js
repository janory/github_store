import React, { Component } from "react";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

export default class RepoItem extends Component {
  loadCommits = (owner, name) => {
    this.props.callback(owner, name);
  };

  render() {
    const { name, owner, description } = this.props;

    return (
      <div className="repo-item">
        <ListItem button onClick={this.loadCommits.bind(this, owner, name)}>
          <ListItemText primary={name} secondary={description} />
        </ListItem>
        <Divider />
      </div>
    );
  }
}
