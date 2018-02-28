import * as types from "../constants/ActionTypes";
import config from "../config";
import { push } from "react-router-redux";
import parseLinkHeader from "parse-link-header";

const PAGE_SIZE = 20;

export const loadReposAndNavigateToRepos = username => async dispatch => {
  const loaded = await dispatch(initReposForUser(username));
  if (loaded) {
    dispatch(push(`/user/${username}/repos`));
  }
};

export const initReposForUser = username => async dispatch => {
  return await dispatch(
    loadReposForUser(
      types.LOAD_REPOSITORIES_FINISHED,
      types.LOAD_REPOSITORIES_FAILED,
      `${config.githubApi}/users/${username}/repos?per_page=${PAGE_SIZE}`
    )
  );
};

export const loadNextPageForRepos = (dispatch, getState) => {
  dispatch(
    loadReposForUser(
      types.LOAD_NEXT_PAGE_OF_REPOSITORIES_FINISHED,
      types.LOAD_NEXT_PAGE_OF_REPOSITORIES_FAILED,
      getState().repository.nextPageOfRepos
    )
  );
};

export const removeFilterForUser = {
  type: types.REMOVE_FILTER_FOR_USER
};

export const loadReposForUser = (
  finishEvent,
  failureEvent,
  url
) => async dispatch => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    });

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const repositories = await response.json();

    const links = parseLinkHeader(response.headers.get("Link"));
    const nextPageOfRepos = links && links.next ? links.next.url : null;

    dispatch({
      type: finishEvent,
      payload: {
        repositories,
        nextPageOfRepos,
        avatarUrl: repositories[0].owner.avatar_url
      }
    });

    return true;
  } catch (e) {
    dispatch({
      type: failureEvent,
      payload: {
        error: e.message
      }
    });
    return false;
  }
};
