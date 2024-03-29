import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import { connect } from "react-redux";
import RepoItem from "../../components/RepoItem/index";
import UserInfo from "../../components/UserInfo/index";
import {
  initReposForUser,
  loadNextPageForRepos
} from "../../actions/repositoryActions";

import { loadCommitsAndNavigateToCommits } from "../../actions/commitActions";
import InfiniteScroll from "react-infinite-scroller";
import "./RepoListView.css";

const mapStateToProps = state => ({
  repositories: state.repository.repositories,
  nextPageOfRepos: state.repository.nextPageOfRepos,
  avatarUrl: state.repository.avatarUrl
});

const mapDispatchToProps = dispatch => ({
  initReposForUser: username => dispatch(initReposForUser(username)),
  loadNextPageForRepos: () => dispatch(loadNextPageForRepos),
  loadCommitsAndNavigateToCommits: (owner, reponame) =>
    dispatch(loadCommitsAndNavigateToCommits(owner, reponame))
});

class RepoListView extends Component {
  static propTypes = {
    repositories: PropTypes.array.isRequired,
    nextPageOfRepos: PropTypes.string,
    initReposForUser: PropTypes.func.isRequired,
    loadNextPageForRepos: PropTypes.func.isRequired,
    loadCommitsAndNavigateToCommits: PropTypes.func.isRequired
  };

  componentDidMount() {
    const { repositories, match } = this.props;

    if (repositories.length === 0) {
      this.props.initReposForUser(match.params.username);
    }
  }

  render() {
    const {
      match,
      nextPageOfRepos,
      avatarUrl,
      loadNextPageForRepos
    } = this.props;

    const repos = this.props.repositories.map(repos => (
      <RepoItem
        key={repos.id}
        name={repos.name}
        owner={match.params.username}
        description={repos.description}
        callback={this.props.loadCommitsAndNavigateToCommits}
      />
    ));

    return (
      <div className="repo-list-view">
        <UserInfo username={match.params.username} avatarUrl={avatarUrl} />
        <List>
          <InfiniteScroll
            pageStart={0}
            loadMore={loadNextPageForRepos.bind(this)}
            hasMore={nextPageOfRepos !== null}
            loader={
              <div className="loader" key={0}>
                Loading ...
              </div>
            }
            useWindow={true}
            initialLoad={false}
            isReverse={false}
          >
            {repos}
          </InfiniteScroll>
        </List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoListView);
