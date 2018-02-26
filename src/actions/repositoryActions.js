import * as types from "../constants/ActionTypes";
import config from "../config";
import { push } from "react-router-redux";

const PAGE_SIZE = 20;

export const loadReposForUser = username => async dispatch => {
  dispatch({
    type: types.LOAD_REPOSITORIES_STARTED,
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

    // Add paging with infinite-scroller:
    // Link: <https://api.github.com/user/69631/repos?per_page=20&page=8>; rel="prev", <https://api.github.com/user/69631/repos?per_page=20&page=1>; rel="first"
    // Link can be null if it's less than 20
    // we can check this on the component side and call the infinite-scroller
    console.log("Link: " + response.headers.get("Link"));

    // set the next page link in the store if it's given or set it to null
    dispatch({
      type: types.LOAD_REPOSITORIES_FINISHED,
      payload: {
        username,
        repositories
      }
    });
    dispatch(push(`/user/${username}/repos`));

    return true;
  } catch (e) {
    dispatch({
      type: types.LOAD_REPOSITORIES_FAILED,
      payload: {
        error: e.message
      }
    });
    return false;
  }
};
