import React, { Component } from "react";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

export default class RepoItem extends Component {
  render() {
    return (
      <div className="repo-item">
        <ListItem>
          <ListItemText
            primary={this.props.name}
            secondary={this.props.description}
          />
        </ListItem>
        <Divider />
      </div>
    );
  }
}
