import * as types from "../constants/ActionTypes";

export default function reducer(
  state = {
    username: null
  },
  action
) {

  switch (action.type) {
    case types.FETCH_USER_FINISHED: {
      console.log("i log this: " + action.type);
      return { ...state, username: action.payload.username };
    }
    default: {
      console.log("i log this default: " + action.type);
      return state;
    }
  }
}
