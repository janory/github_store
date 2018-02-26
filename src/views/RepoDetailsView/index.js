import React, { Component } from "react";
import List from "material-ui/List";
import { connect } from "react-redux";
import CommitItem from "../../components/CommitItem/index";
import { loadCommitsForRepo } from "../../actions/repositoryActions";

const mapStateToProps = state => ({
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
    const { reponame } = this.props;

    const commits = this.props.commits.map((commitItem, idx) => (
      <CommitItem
        key={idx}
        message={commitItem.commit.message}
        author={commitItem.commit.author}
      />
    ));

    return (
      <div className="repo-list-view">
        <h1>{reponame}</h1>
        <List>{commits}</List>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RepoListView);
