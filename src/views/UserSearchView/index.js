import React, { Component } from "react";
import SearchBar from "../../components/SearchBar/index";

export default class UserSearchView extends Component {
  render() {
    return (
      <div>
        <SearchBar text={"Search repositories by user... "} />
      </div>
    );
  }
}
