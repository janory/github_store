import React, { Component } from "react";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

export default class CommitItem extends Component {
  render() {
    const {message, author } = this.props;

    return (
      <div className="repo-item">
        <ListItem>
          <ListItemText
            primary={message}
            secondary={author.name}
          />
        </ListItem>
        <Divider />
      </div>
    );
  }
}
