import React, { Component } from "react";
import List from "material-ui/List";
import { connect } from "react-redux";
import CommitItem from "../../components/CommitItem/index";
import SearchBar from "../../components/SearchBar/index";
import { loadCommitsForRepo, searchForCommits } from "../../actions/repositoryActions";
import "./RepoDetailsView.css";


const mapStateToProps = state => ({
  reponame: state.repository.reponame,
  commits: state.repository.commits
});

const mapDispatchToProps = dispatch => ({
  loadCommitsForRepo: (owner, reponame) => dispatch(loadCommitsForRepo(owner, reponame)),
  searchForCommits: (owner, reponame, message) => dispatch(searchForCommits(owner, reponame, message))
});

class RepoListView extends Component {
  componentDidMount() {
    const { match, commits } = this.props;

    if (commits.length === 0) {
      this.props.loadCommitsForRepo(match.params.owner, match.params.repo);
    }
  }

  searchForCommitsWithOutParams = (message) => {
    const { reponame, searchForCommits, match } = this.props;
    searchForCommits(match.params.owner, reponame, message);
  };

  render() {
    const { reponame, match } = this.props;

    const commits = this.props.commits.map((commitItem, idx) => (
      <CommitItem
        key={idx}
        message={commitItem.commit.message}
        author={commitItem.commit.author}
      />
    ));

    return (
      <div className="repo-details-view">
        <h1>Owner: {match.params.owner}</h1>
        <h1>Repository: {reponame}</h1>
        <div>
          <SearchBar text={"Search for commits "} callback={this.searchForCommitsWithOutParams} />
        </div>
        <List>{commits}</List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoListView);
