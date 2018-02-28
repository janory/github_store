import React from "react";
import PropTypes from "prop-types";
import dateformat from "dateformat";
import { ListItem, ListItemText } from "material-ui/List";
import Divider from "material-ui/Divider";

const CommitItem = ({ message, nameOrLogin, commitDate }) => {
  return (
    <div className="commit-item">
      <ListItem>
        <ListItemText
          primary={message}
          secondary={
            nameOrLogin +
            " commited on " +
            dateformat(new Date(commitDate), "d mmm yyyy")
          }
        />
      </ListItem>
      <Divider />
    </div>
  );
};

CommitItem.propTypes = {
  message: PropTypes.string.isRequired,
  nameOrLogin: PropTypes.string.isRequired,
  commitDate: PropTypes.string.isRequired
};

export default CommitItem;
