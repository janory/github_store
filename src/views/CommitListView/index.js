import React, { Component } from "react";
import List from "material-ui/List";
import { connect } from "react-redux";
import CommitItem from "../../components/CommitItem/index";
import SearchBar from "../../components/SearchBar/index";
import {
  loadCommitsForRepo,
  removeFilterForCommits,
  searchForCommits,
  loadNextPageForCommits
} from "../../actions/repositoryActions";
import "./CommitListView.css";
import InfiniteScroll from "react-infinite-scroller";

const mapStateToProps = state => ({
  reponame: state.repository.reponame,
  commits: state.repository.commits,
  filteredCommits: state.repository.filteredCommits,
  nextPageOfCommits: state.repository.nextPageOfCommits
});

const mapDispatchToProps = dispatch => ({
  loadCommitsForRepo: (owner, reponame) =>
    dispatch(loadCommitsForRepo(owner, reponame)),
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
      this.props.loadCommitsForRepo(match.params.owner, match.params.repo);
    }
  }

  searchForCommitsWithOutParams = message => {
    const { reponame, searchForCommits, match } = this.props;
    searchForCommits(match.params.owner, reponame, message);
  };

  clearFilter = () => {
    this.props.removeFilterForCommits();
  };

  render() {
    const {
      nextPageOfCommits,
      reponame,
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
        <h1>Repository: {reponame}</h1>
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
