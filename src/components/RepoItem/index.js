import React, { Component } from "react";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";
import { withRouter } from "react-router-dom";

class RepoItem extends Component {
  render() {
    const { name, owner, description, history } = this.props;

    return (
      <div className="repo-item">
        <ListItem button>
          <ListItemText
            primary={name}
            secondary={description}
            onClick={() => {
              history.push(`/repos/${owner}/${name}/commits`);
            }}
          />
        </ListItem>
        <Divider />
      </div>
    );
  }
}

export default withRouter(RepoItem);
