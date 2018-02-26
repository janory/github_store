import React, { Component } from "react";
import List from "material-ui/List";
import { connect } from "react-redux";
import CommitItem from "../../components/CommitItem/index";
import { loadCommitsForRepo } from "../../actions/repositoryActions";
import "./RepoDetailsView.css";


const mapStateToProps = state => ({
  username: state.repository.username,
  reponame: state.repository.reponame,
  commits: state.repository.commits
});

const mapDispatchToProps = dispatch => ({
  loadCommitsForRepo: (owner, repo) => dispatch(loadCommitsForRepo(owner, repo))
});

class RepoListView extends Component {
  componentDidMount() {
    const { commits, match } = this.props;

    if (commits.length === 0) {
      this.props.loadCommitsForRepo(match.params.owner, match.params.repo);
    }
  }

  render() {
    const { reponame, username } = this.props;

    const commits = this.props.commits.map((commitItem, idx) => (
      <CommitItem
        key={idx}
        message={commitItem.commit.message}
        author={commitItem.commit.author}
      />
    ));

    return (
      <div className="repo-details-view">
        <h1>Owner: {username}</h1>
        <h1>Repository: {reponame}</h1>
        <List>{commits}</List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoListView);
