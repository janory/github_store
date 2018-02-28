import React, { Component } from "react";
import List from "material-ui/List";
import { connect } from "react-redux";
import CommitItem from "../../components/CommitItem/index";
import SearchBar from "../../components/SearchBar/index";
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
  nextPageOfCommits: state.commit.nextPageOfCommits
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
      loadNextPageForCommits
    } = this.props;

    const commitItems =
      filteredCommits.length > 0
        ? filteredCommits.map((commitItem, idx) => (
            <CommitItem
              key={idx}
              message={commitItem.commit.message}
              author={commitItem.commit.author}
            />
          ))
        : commits.map((commitItem, idx) => (
            <CommitItem
              key={idx}
              message={commitItem.commit.message}
              author={commitItem.commit.author}
            />
          ));

    return (
      <div className="commit-list-view">
        <h1>Owner: {match.params.owner}</h1>
        <h1>Repository: {match.params.repo}</h1>
        <div>
          <SearchBar
            text={"Search for commits "}
            clearCallback={this.clearFilter}
            submitCallback={this.searchForCommitsWithOutParams}
          />
        </div>
        {filteredCommits.length > 0 ? (
          <List>{commitItems}</List>
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
