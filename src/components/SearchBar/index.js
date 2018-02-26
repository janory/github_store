import React, { Component } from "react";
import Button from "material-ui/Button";
import { withRouter } from "react-router-dom";
import "./SearchBar.css";

const ENTER_KEY = 13;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
    event.preventDefault();
  };

  handleKeyDown = event => {
    if (event.keyCode === ENTER_KEY) {
      this.triggerSearch();
      event.preventDefault();
    }
  };

  triggerSearch = () => {
    if (this.state.username.trim()) {
      this.props.history.push(`/user/${this.state.username}/repos`);
    }
  };

  render() {
    return (
      <div className="search-bar">
        <input
          name="username"
          type="text"
          placeholder={this.props.text}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
        />
        <Button
          variant="raised"
          color="primary"
          onClick={this.triggerSearch.bind(this)}
        >
          Search
        </Button>
      </div>
    );
  }
}

export default withRouter(SearchBar);
