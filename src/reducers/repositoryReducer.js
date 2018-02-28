import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    repositories: [],
    nextPageOfRepos: null,
    avatarUrl: null,
    userNotFound: false
  },
  action
) {
  switch (action.type) {
    case types.LOAD_REPOSITORIES_FINISHED: {
      return {
        ...state,
        repositories: action.payload.repositories,
        nextPageOfRepos: action.payload.nextPageOfRepos,
        avatarUrl: action.payload.avatarUrl,
        userNotFound: false
      };
    }
    case types.LOAD_NEXT_PAGE_OF_REPOSITORIES_FINISHED: {
      return {
        ...state,
        repositories: state.repositories.concat(action.payload.repositories),
        nextPageOfRepos: action.payload.nextPageOfRepos
      };
    }
    case types.LOAD_REPOSITORIES_FAILED: {
      return {
        ...state,
        userNotFound: true
      };
    }
    case types.REMOVE_FILTER_FOR_USER: {
      return {
        ...state,
        userNotFound: false
      };
    }
    default: {
      return state;
    }
  }
}
