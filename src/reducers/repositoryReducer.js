import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    username: null,
    repositories: []
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
    default: {
      return state;
    }
  }
}
