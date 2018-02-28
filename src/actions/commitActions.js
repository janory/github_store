import * as types from "../constants/ActionTypes";
import config from "../config";
import { push } from "react-router-redux";
import parseLinkHeader from "parse-link-header";

const PAGE_SIZE = 20;

export const loadCommitsAndNavigateToCommits = (
  owner,
  reponame
) => async dispatch => {
  await dispatch(initCommitsForRepo(owner, reponame));
  dispatch(push(`/repos/${owner}/${reponame}/commits`));
}

export const initCommitsForRepo = (owner, reponame) => async dispatch => {
  await dispatch(
    loadCommits(
      types.LOAD_COMMITS_FINISHED,
      types.LOAD_COMMITS_FAILED,
      `${
        config.githubApi
        }/repos/${owner}/${reponame}/commits?per_page=${PAGE_SIZE}`
    )
  );
};

export const loadNextPageForCommits = (dispatch, getState) => {
  dispatch(
    loadCommits(
      types.LOAD_NEXT_PAGE_OF_COMMITS_FINISHED,
      types.LOAD_NEXT_PAGE_OF_COMMITS_FAILED,
      getState().commit.nextPageOfCommits
    )
  );
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

const loadCommits = (finishEvent, failureEvent, url) => async dispatch => {
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

    const commits = await response.json();

    const links = parseLinkHeader(response.headers.get("Link"));
    const nextPageOfCommits = links && links.next ? links.next.url : null;

    dispatch({
      type: finishEvent,
      payload: {
        commits,
        nextPageOfCommits
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
