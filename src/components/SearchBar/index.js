import React, { Component } from "react";
import Button from 'material-ui/Button';
import "./SearchBar.css";

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { username: "" };
  }

  handleChange = (name, event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  triggerSearch = () => {
    this.props.callback(this.state.username)
  };

  render() {
    return (
      <div className="search-bar">
        <input type="text" placeholder={this.props.text} onChange={this.handleChange.bind(this, "username")} />
        <Button variant="raised" color="primary" onClick={this.triggerSearch.bind(this)}>
          Search
        </Button>
      </div>
    )
  }
}
