import React from "react";
import Card, { CardMedia } from "material-ui/Card";
import PropTypes from "prop-types";
import "./UserInfo.css";

const UserInfo = ({ username, respository, avatarUrl }) => {
  return (
    <div className="user-info">
      <Card className="user-info-card">
        {avatarUrl ? (
          <CardMedia
            className="card-media"
            image={avatarUrl}
            title={username}
          />
        ) : (
          ""
        )}
      </Card>
      <div className="user-info-details">
        <h1>{username}</h1>
        <h1>{respository}</h1>
      </div>
    </div>
  );
};

UserInfo.propTypes = {
  username: PropTypes.string.isRequired,
  respository: PropTypes.string,
  avatarUrl: PropTypes.string
};

export default UserInfo;
