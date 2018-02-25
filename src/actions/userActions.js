import * as types from "../constants/ActionTypes";

export const searchUser = username => ({
  type: types.FETCH_USER_FINISHED,
  payload: {
    username
  }
});
