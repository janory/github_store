import * as types from "../constants/ActionTypes";
import config from "../config";
import { push } from "react-router-redux";

const PAGE_SIZE = 20;

export const searchUser = username => async dispatch => {
  dispatch({
    type: types.FETCH_USER_STARTED,
    payload: {
      username
    }
  });

  try {
    const response = await fetch(
      `${config.githubApi}/users/${username}/repos?per_page=${PAGE_SIZE}`,
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

    const repositories = await response.json();

    dispatch({
      type: types.FETCH_USER_FINISHED,
      payload: {
        username,
        repositories
      }
    });
    dispatch(push(`/user/${username}/repos`));

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
