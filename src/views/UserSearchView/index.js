import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBar from "../../components/SearchBar/index";
import { loadReposForUser } from "../../actions/repositoryActions";

const mapDispatchToProps = dispatch => ({
  loadReposForUser: username => dispatch(loadReposForUser(username))
});

class UserSearchView extends Component {
  render() {
    return (
      <div>
        <SearchBar
          text={"Search repositories by user... "}
          callback={this.props.loadReposForUser}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(UserSearchView);
