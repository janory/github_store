import * as types from "../constants/ActionTypes";
import config from "../config";
import { push } from 'react-router-redux';


export const searchUser = username => async dispatch => {
  dispatch({
    type: types.FETCH_USER_STARTED,
    payload: {
      username
    }
  });

  try {
    const response = await fetch(
      `${config.githubApi}/users/${username}/repos`,
      {
        method: "GET",
        headers: {
          Accept: "application/json"
        }
      }
    );

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const data = await response.json();

    dispatch(push(`/user/${username}/repos`));
    dispatch({
      type: types.FETCH_USER_FINISHED,
      payload: {
        data
      }
    });

    return true;
  } catch (e) {
    dispatch({
      type: types.FETCH_USER_FAILED,
      payload: {
        error: e.message
      }
    });
    return false;
  }
};
