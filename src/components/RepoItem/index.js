import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

const RepoItem = ({ name, owner, description, callback }) => {
  const loadCommits = (owner, name) => {
    callback(owner, name);
  };

  return (
    <div className="repo-item">
      <ListItem button onClick={loadCommits.bind(this, owner, name)}>
        <ListItemText primary={name} secondary={description} />
      </ListItem>
      <Divider />
    </div>
  );
};

RepoItem.propTypes = {
  name: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  description: PropTypes.string,
  callback: PropTypes.func.isRequired
};

export default RepoItem;
