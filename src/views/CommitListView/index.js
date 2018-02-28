import React, { Component } from "react";
import PropTypes from "prop-types";
import List from "material-ui/List";
import { connect } from "react-redux";
import CommitItem from "../../components/CommitItem/index";
import SearchBar from "../../components/SearchBar/index";
import UserInfo from "../../components/UserInfo/index";
import {
  initCommitsForRepo,
  removeFilterForCommits,
  searchForCommits,
  loadNextPageForCommits
} from "../../actions/commitActions";
import InfiniteScroll from "react-infinite-scroller";
import "./CommitListView.css";

const mapStateToProps = state => ({
  commits: state.commit.commits,
  filteredCommits: state.commit.filteredCommits,
  filtered: state.commit.filtered,
  nextPageOfCommits: state.commit.nextPageOfCommits,
  avatarUrl: state.repository.avatarUrl
});

const mapDispatchToProps = dispatch => ({
  initCommitsForRepo: (owner, reponame) =>
    dispatch(initCommitsForRepo(owner, reponame)),
  searchForCommits: (owner, reponame, message) =>
    dispatch(searchForCommits(owner, reponame, message)),
  removeFilterForCommits: () => dispatch(removeFilterForCommits),
  loadNextPageForCommits: () => dispatch(loadNextPageForCommits)
});

class CommitListView extends Component {
  static propTypes = {
    commits: PropTypes.array.isRequired,
    filteredCommits: PropTypes.array.isRequired,
    filtered: PropTypes.bool.isRequired,
    nextPageOfCommits: PropTypes.string,
    initCommitsForRepo: PropTypes.func.isRequired,
    searchForCommits: PropTypes.func.isRequired,
    removeFilterForCommits: PropTypes.func.isRequired,
    loadNextPageForCommits: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  componentDidMount() {
    const { match, commits } = this.props;

    if (commits.length === 0) {
      this.props.initCommitsForRepo(match.params.owner, match.params.repo);
    }
  }

  searchForCommitsWithOutParams = message => {
    const { searchForCommits, match } = this.props;
    searchForCommits(match.params.owner, match.params.repo, message);
  };

  clearFilter = () => {
    this.props.removeFilterForCommits();
  };

  render() {
    const {
      nextPageOfCommits,
      match,
      commits,
      filteredCommits,
      filtered,
      loadNextPageForCommits,
      avatarUrl
    } = this.props;

    const commitItems =
      filtered > 0
        ? filteredCommits.map((commitItem, idx) => (
            <CommitItem
              key={idx}
              message={commitItem.commit.message}
              nameOrLogin={
                commitItem.author
                  ? commitItem.author.login
                  : commitItem.commit.author.name
              }
              commitDate={commitItem.commit.author.date}
            />
          ))
        : commits.map((commitItem, idx) => (
            <CommitItem
              key={idx}
              message={commitItem.commit.message}
              nameOrLogin={
                commitItem.author
                  ? commitItem.author.login
                  : commitItem.commit.author.name
              }
              commitDate={commitItem.commit.author.date}
            />
          ));

    return (
      <div className="commit-list-view">
        <UserInfo
          username={match.params.owner}
          respository={match.params.repo}
          avatarUrl={avatarUrl}
        />
        <div>
          <SearchBar
            text={"Search for commits "}
            clearCallback={this.clearFilter}
            submitCallback={this.searchForCommitsWithOutParams}
          />
        </div>
        {filtered ? (
          filteredCommits.length > 0 ? (
            <List>{commitItems}</List>
          ) : (
            <h1>
              The given user is either not the owner of this repo, or there are
              no commits with the given filter.
            </h1>
          )
        ) : (
          <List>
            <InfiniteScroll
              pageStart={0}
              loadMore={loadNextPageForCommits.bind(this)}
              hasMore={nextPageOfCommits !== null}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
              useWindow={false}
              initialLoad={false}
              isReverse={false}
            >
              {commitItems}
            </InfiniteScroll>
          </List>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommitListView);
