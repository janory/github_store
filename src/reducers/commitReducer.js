import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    commits: [],
    filteredCommits: [],
    filtered: false,
    nextPageOfCommits: null
  },
  action
) {
  switch (action.type) {
    case types.LOAD_COMMITS_FINISHED: {
      return {
        ...state,
        commits: action.payload.commits,
        nextPageOfCommits: action.payload.nextPageOfCommits,
        filteredCommits: [],
        filtered: false
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
        filteredCommits: action.payload.filteredCommits,
        filtered: true
      };
    }
    case types.REMOVE_FILTER_FOR_COMMITS: {
      return {
        ...state,
        filteredCommits: [],
        filtered: false

      };
    }
    default: {
      return state;
    }
  }
}
