import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    repositories: [],
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
    default: {
      return state;
    }
  }
}
