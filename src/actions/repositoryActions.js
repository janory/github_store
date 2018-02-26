import * as types from "../constants/ActionTypes";
import config from "../config";
import { push } from "react-router-redux";

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

export const loadCommitsAndNavigateToRepoDetails = (owner, reponame) => async dispatch => {
  await dispatch(loadCommitsForRepo(owner, reponame));
  dispatch(push(`/repos/${owner}/${reponame}/commits`));
};

// https://api.github.com/search/commits?utf8=%E2%9C%93&q=Alphabetize+and+clean+repo%3Afacebook%2Fcreate-react-app&type=Commits
export const searchForCommits = (owner, reponame, message) => async dispatch => {
  try {
    const response = await fetch(
      `${
        config.githubApi
        }/search/commits?utf8=%E2%9C%93&q=${message.replace(/\s+/g, '+')}+repo%3A${owner}%2F${reponame}&type=Commits`,
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

    // Add paging with infinite-scroller:
    // Link: <https://api.github.com/user/69631/repos?per_page=20&page=8>; rel="prev", <https://api.github.com/user/69631/repos?per_page=20&page=1>; rel="first"
    // Link can be null if it's less than 20
    // we can check this on the component side and call the infinite-scroller
    console.log("Link: " + response.headers.get("Link"));

    // set the next page link in the store if it's given or set it to null
    dispatch({
      type: types.LOAD_COMMITS_FINISHED,
      payload: {
        reponame,
        commits: commits.items
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

export const loadCommitsForRepo = (owner, reponame) => async dispatch => {
  try {
    const response = await fetch(
      `${
        config.githubApi
      }/repos/${owner}/${reponame}/commits?per_page=${PAGE_SIZE}`,
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

    // Add paging with infinite-scroller:
    // Link: <https://api.github.com/user/69631/repos?per_page=20&page=8>; rel="prev", <https://api.github.com/user/69631/repos?per_page=20&page=1>; rel="first"
    // Link can be null if it's less than 20
    // we can check this on the component side and call the infinite-scroller
    console.log("Link: " + response.headers.get("Link"));

    // set the next page link in the store if it's given or set it to null
    dispatch({
      type: types.LOAD_COMMITS_FINISHED,
      payload: {
        reponame,
        commits
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
