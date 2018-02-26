import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    username: null,
    repositories: [],
    commits: [],
    filteredCommits: []
  },
  action
) {
  switch (action.type) {
    case types.LOAD_REPOSITORIES_FINISHED: {
      return {
        ...state,
        repositories: action.payload.repositories
      };
    }
    case types.LOAD_COMMITS_FINISHED: {
      return {
        ...state,
        reponame: action.payload.reponame,
        commits: action.payload.commits,
        filteredCommits: []

      };
    }
    case types.FILTER_COMMITS_FINISHED: {
      return {
        ...state,
        filteredCommits: action.payload.filteredCommits
      };
    }
    case types.REMOVE_FILTER_FOR_COMMITS: {
      return {
        ...state,
        filteredCommits: []
      };
    }
    default: {
      return state;
    }
  }
}
