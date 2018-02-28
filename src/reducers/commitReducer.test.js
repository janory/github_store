import * as types from "../constants/ActionTypes";
import conmmitReducer from "./commitReducer";

describe("the commit reducer", () => {
  it("should store the commits and the nextPage when LOAD_COMMITS_FINISHED action fired", () => {
    const reducedState = conmmitReducer(undefined, {
      type: types.LOAD_COMMITS_FINISHED,
      payload: {
        commits: ["commit1", "commit2", "commit3"],
        nextPageOfCommits: "http://the.url.of.the.next.page",
      }
    });

    expect(reducedState).toEqual({
      commits: ["commit1", "commit2", "commit3"],
      nextPageOfCommits: "http://the.url.of.the.next.page",
      filteredCommits: [],
      filtered: false
    });
  });
});
