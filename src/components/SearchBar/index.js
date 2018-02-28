import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "material-ui/Button";
import Clear from "material-ui-icons/Clear";
import "./SearchBar.css";

const ENTER_KEY = 13;

export default class SearchBar extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    submitCallback: PropTypes.func.isRequired,
    clearCallback: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  clearFilter = () => {
    const { clearCallback } = this.props;

    this.setState({ value: "" });
    if (clearCallback) {
      clearCallback();
    }
  };

  handleKeyDown = event => {
    if (event.keyCode === ENTER_KEY) {
      this.triggerSearch();
      event.preventDefault();
    }
  };

  triggerSearch = () => {
    if (this.state.value.trim()) {
      this.props.submitCallback(this.state.value);
    }
  };

  render() {
    return (
      <div className="search-bar">
        <input
          name="searchText"
          type="text"
          placeholder={this.props.text}
          onChange={this.handleChange.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          value={this.state.value}
        />
        <Button
          variant="raised"
          color="primary"
          onClick={this.triggerSearch.bind(this)}
        >
          Search
        </Button>
        <Button
          variant="raised"
          color="secondary"
          className="clear-button"
          onClick={this.clearFilter.bind(this)}
        >
          <Clear />
        </Button>
      </div>
    );
  }
}
