import React from "react";
import PropTypes from "prop-types";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

const CommitItem = ({ message, author }) => {
  return (
    <div className="commit-item">
      <ListItem>
        <ListItemText primary={message} secondary={author.name} />
      </ListItem>
      <Divider />
    </div>
  );
};

CommitItem.propTypes = {
  message: PropTypes.string.isRequired,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired
  }).isRequired
};

export default CommitItem;
