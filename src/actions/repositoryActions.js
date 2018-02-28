import * as types from "../constants/ActionTypes";
import config from "../config";
import { push } from "react-router-redux";
import parseLinkHeader from "parse-link-header";

const PAGE_SIZE = 20;

export const loadReposAndNavigateToRepos = username => async dispatch => {
  await dispatch(loadReposForUser(username));
  dispatch(push(`/user/${username}/repos`));
};

export const loadReposForUser = username => async dispatch => {
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
      type: types.LOAD_REPOSITORIES_FINISHED,
      payload: {
        repositories
      }
    });

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

export const loadCommitsAndNavigateToRepoDetails = (
  owner,
  reponame
) => async dispatch => {
  await dispatch(loadCommitsForRepo(owner, reponame));
  dispatch(push(`/repos/${owner}/${reponame}/commits`));
};

export const searchForCommits = (
  owner,
  reponame,
  message
) => async dispatch => {
  try {
    const response = await fetch(
      `${config.githubApi}/search/commits?utf8=%E2%9C%93&q=${message.replace(
        /\s+/g,
        "+"
      )}+repo%3A${owner}%2F${reponame}&type=Commits`,
      {
        method: "GET",
        headers: {
          Accept: "application/vnd.github.cloak-preview"
        }
      }
    );

    if (!response.ok) {
      throw Error(response.statusText);
    }

    const commits = await response.json();

    dispatch({
      type: types.FILTER_COMMITS_FINISHED,
      payload: {
        filteredCommits: commits.items
      }
    });

    return true;
  } catch (e) {
    dispatch({
      type: types.FILTER_COMMITS_FAILED,
      payload: {
        error: e.message
      }
    });
    return false;
  }
};

export const removeFilterForCommits = {
  type: types.REMOVE_FILTER_FOR_COMMITS
};

export const loadNextPageForCommits = async (dispatch, getState) => {
  try {
    const currentState = getState();
    const response = await fetch(currentState.repository.nextPageOfCommits,
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

    const nextCommits = await response.json();

    const links = parseLinkHeader(response.headers.get("Link"));
    const nextPageOfCommits = (links && links.next) ? links.next.url : null;

    // set the next page link in the store if it's given or set it to null
    dispatch({
      type: types.LOAD_NEXT_PAGE_OF_COMMITS_FINISHED,
      payload: {
        nextCommits,
        nextPageOfCommits
      }
    });

    return true;
  } catch (e) {
    dispatch({
      type: types.LOAD_NEXT_PAGE_OF_COMMITS_FAILED,
      payload: {
        error: e.message
      }
    });
    return false;
  }
};

export const loadCommitsForRepo = (owner, reponame) => async (dispatch, getState) => {
  try {
    const response = await fetch(`${config.githubApi}/repos/${owner}/${reponame}/commits?per_page=${PAGE_SIZE}`,
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

    const commits = await response.json();

    const links = parseLinkHeader(response.headers.get("Link"));
    const nextPageOfCommits = (links && links.next) ? links.next.url : null;

    // set the next page link in the store if it's given or set it to null
    dispatch({
      type: types.LOAD_COMMITS_FINISHED,
      payload: {
        reponame,
        commits,
        nextPageOfCommits
      }
    });

    return true;
  } catch (e) {
    dispatch({
      type: types.LOAD_COMMITS_FAILED,
      payload: {
        error: e.message
      }
    });
    return false;
  }
};
