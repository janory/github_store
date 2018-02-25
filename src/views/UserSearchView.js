import React, { Component } from "react";
import SearchBar from "../components/SearchBar";


export default class UserSearchView extends Component {
  render() {
    return (
      <div>
        <SearchBar text={"Search for users... "} callback={() => alert("fired!")}/>
      </div>
    );
  }
}
