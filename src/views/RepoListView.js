import React, { Component } from "react";
import List from "material-ui/List";
import { connect } from "react-redux";
import RepoItem from "../components/RepoItem";
import { loadReposForUser } from "../actions/repositoryActions";

const mapStateToProps = state => ({
  username: state.repository.username,
  repositories: state.repository.repositories
});

const mapDispatchToProps = dispatch => ({
  searchUser: username => dispatch(loadReposForUser(username))
});

class RepoListView extends Component {
  componentDidMount() {
    const { repositories, match } = this.props;

    if (repositories.length === 0) {
      this.props.searchUser(match.params.username);
    }
  }

  render() {
    const repos = this.props.repositories.map(repos => (
      <RepoItem
        key={repos.id}
        name={repos.name}
        description={repos.description}
      />
    ));

    return (
      <div>
        <h1>{this.props.username}</h1>
        <List>{repos}</List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoListView);
