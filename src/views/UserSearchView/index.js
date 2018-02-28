import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchBar from "../../components/SearchBar/index";
import { connect } from "react-redux";
import {
  loadReposAndNavigateToRepos,
  removeFilterForUser
} from "../../actions/repositoryActions";

const mapStateToProps = state => ({
  userNotFound: state.repository.userNotFound
});

const mapDispatchToProps = dispatch => ({
  loadReposAndNavigateToRepos: username =>
    dispatch(loadReposAndNavigateToRepos(username)),
  removeFilterForUser: () => dispatch(removeFilterForUser)
});

export class UserSearchView extends Component {
  static propTypes = {
    userNotFound: PropTypes.bool.isRequired,
    loadReposAndNavigateToRepos: PropTypes.func.isRequired,
    removeFilterForUser: PropTypes.func.isRequired
  };

  clearFilter = () => {
    this.props.removeFilterForUser();
  };

  render() {
    const { userNotFound, loadReposAndNavigateToRepos } = this.props;

    return (
      <div>
        <SearchBar
          text={"Search repositories by user... "}
          submitCallback={loadReposAndNavigateToRepos}
          clearCallback={this.clearFilter}
        />
        {userNotFound ? (
          <h1>Could not find user with the given filter.</h1>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSearchView);
