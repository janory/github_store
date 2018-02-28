import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "../../components/SearchBar/index";
import { connect } from "react-redux";
import { loadReposAndNavigateToRepos } from "../../actions/repositoryActions";

const mapDispatchToProps = dispatch => ({
  loadReposAndNavigateToRepos: username =>
    dispatch(loadReposAndNavigateToRepos(username))
});

export class UserSearchView extends Component {
  static propTypes = {
    loadReposAndNavigateToRepos: PropTypes.func.isRequired
  };

  render() {
    return (
      <div>
        <SearchBar
          text={"Search repositories by user... "}
          submitCallback={this.props.loadReposAndNavigateToRepos}
        />
      </div>
    );
  }
}

export default connect(null, mapDispatchToProps)(UserSearchView);
