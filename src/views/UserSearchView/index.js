import React, { Component } from "react";
import SearchBar from "../../components/SearchBar/index";
import { connect } from "react-redux";
import { loadReposAndNavigateToRepos } from "../../actions/repositoryActions";

const mapDispatchToProps = dispatch => ({
  loadReposAndNavigateToRepos: username => dispatch(loadReposAndNavigateToRepos(username))
});

class UserSearchView extends Component {
  render() {
    return (
      <div>
        <SearchBar text={"Search repositories by user... "} callback={this.props.loadReposAndNavigateToRepos}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(UserSearchView);
