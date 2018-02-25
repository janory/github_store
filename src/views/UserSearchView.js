import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../components/SearchBar";
import { searchUser } from "../actions/userActions";

const mapDispatchToProps = dispatch => ({
  searchUser: username => dispatch(searchUser(username))
});

class UserSearchView extends Component {
  render() {
    return (
      <div>
        <SearchBar
          text={"Search for users... "}
          callback={this.props.searchUser}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(UserSearchView);
