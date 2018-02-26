import React, { Component } from "react";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

export default class RepoItem extends Component {
  render() {
    console.log(this.props.owner);
    console.log(this.props.name);

    return (
      <div className="repo-item">
        <ListItem button>
          <ListItemText
            primary={this.props.name}
            secondary={this.props.description}
            onClick={this.props.loadCommitsForRepo.bind(this, this.props.owner, this.props.name)}
          />
        </ListItem>
        <Divider />
      </div>
    );
  }
}
