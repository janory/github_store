import React from "react";
import Button from 'material-ui/Button';
import "./SearchBar.css";

export default ({ text, callback }) => (
  <div className="search-bar">
    <input type="text" placeholder={text} />
    <Button variant="raised" color="primary" onClick={callback}>
      Search
    </Button>
  </div>
);
