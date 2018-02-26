import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    username: null,
    repositories: [],
    commits: []
  },
  action
) {
  switch (action.type) {
    case types.LOAD_REPOSITORIES_FINISHED: {
      return {
        ...state,
        username: action.payload.username,
        repositories: action.payload.repositories
      };
    }
    case types.LOAD_COMMITS_FINISHED: {
      return {
        ...state,
        commits: action.payload.commits
      };
    }
    default: {
      return state;
    }
  }
}
