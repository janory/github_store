import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    repositories: [],
    commits: [],
    filteredCommits: [],
    nextPageOfCommits: null,
    nextPageOfRepos: null
  },
  action
) {
  switch (action.type) {
    case types.LOAD_REPOSITORIES_FINISHED: {
      return {
        ...state,
        repositories: action.payload.repositories,
        nextPageOfRepos: action.payload.nextPageOfRepos
      };
    }
    case types.LOAD_NEXT_PAGE_OF_REPOSITORIES_FINISHED: {
      return {
        ...state,
        repositories: state.repositories.concat(action.payload.repositories),
        nextPageOfRepos: action.payload.nextPageOfRepos
      };
    }
    case types.LOAD_COMMITS_FINISHED: {
      return {
        ...state,
        commits: action.payload.commits,
        nextPageOfCommits: action.payload.nextPageOfCommits,
        filteredCommits: []
      };
    }
    case types.LOAD_NEXT_PAGE_OF_COMMITS_FINISHED: {
      return {
        ...state,
        commits: state.commits.concat(action.payload.commits),
        nextPageOfCommits: action.payload.nextPageOfCommits
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
