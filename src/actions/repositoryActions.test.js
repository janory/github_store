import * as actions from "./repositoryActions";
import * as types from "../constants/ActionTypes";

const mockResponse = (status, statusText, extraHeaders, response) => {
  return new window.Response(JSON.stringify(response), {
    status: status,
    statusText: statusText,
    headers: {
      "Content-type": "application/json",
      ...extraHeaders
    }
  });
};

describe("repository actions", () => {
  it("should dispatches the repos and the nextPage as payload when the loadReposForUser function is called", async () => {
    const dispatch = jest.fn();

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(
        mockResponse(
          200,
          "OK",
          {
            Link: '<http://the.url.of.the.next.page>; rel="next"'
          },
          ["repo1", "repo2"]
        )
      )
    );

    const result = await actions.loadReposForUser(
      types.LOAD_REPOSITORIES_FINISHED,
      types.LOAD_REPOSITORIES_FAILED,
      "http://some.url/"
    )(dispatch);

    expect(result).toBe(true);

    expect(dispatch).toHaveBeenCalledWith({
      type: types.LOAD_REPOSITORIES_FINISHED,
      payload: {
        repositories: ["repo1", "repo2"],
        nextPageOfRepos: "http://the.url.of.the.next.page"
      }
    });
  });
});
