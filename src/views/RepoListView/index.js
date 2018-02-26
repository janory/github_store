import React, { Component } from "react";
import List from "material-ui/List";
import { connect } from "react-redux";
import RepoItem from "../../components/RepoItem/index";
import { loadReposForUser, loadCommitsAndNavigateToRepoDetails } from "../../actions/repositoryActions";
import "./RepoListView.css";

const mapStateToProps = state => ({
  repositories: state.repository.repositories
});

const mapDispatchToProps = dispatch => ({
  loadReposForUser: username => dispatch(loadReposForUser(username)),
  loadCommitsAndNavigateToRepoDetails: (owner, reponame) => dispatch(loadCommitsAndNavigateToRepoDetails(owner, reponame))
});

class RepoListView extends Component {
  componentDidMount() {
    const { repositories, match } = this.props;

    if (repositories.length === 0) {
      this.props.loadReposForUser(match.params.username);
    }
  }

  render() {
    const { match } = this.props;

    const repos = this.props.repositories.map(repos => (
      <RepoItem
        key={repos.id}
        name={repos.name}
        owner={match.params.username}
        description={repos.description}
        callback={this.props.loadCommitsAndNavigateToRepoDetails}
      />
    ));

    return (
      <div className="repo-list-view">
        <h1>Owner: {match.params.username}</h1>
        <List>{repos}</List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoListView);
