import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    username: null
  },
  action
) {
  switch (action.type) {
    case types.FETCH_USER_FINISHED: {
      return { ...state, username: action.payload.username };
    }
    default:
      return state;
  }
}
