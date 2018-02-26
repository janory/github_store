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
        repositories: action.payload.repositories
      };
    }
    case types.LOAD_COMMITS_FINISHED: {
      return {
        ...state,
        reponame: action.payload.reponame,
        commits: action.payload.commits
      };
    }
    default: {
      return state;
    }
  }
}
