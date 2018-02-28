import React from "react";
import { mount, shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
import { UserSearchView } from ".";
import SearchBar from "../../components/SearchBar/index";

configure({ adapter: new Adapter() });

describe("the UserSearchView component", () => {
  it("should render the SearchBar component", () => {
    const stubbedLoadReposAndNavigateToRepos = () => {};

    const wrapper = shallow(
      <UserSearchView
        loadReposAndNavigateToRepos={stubbedLoadReposAndNavigateToRepos}
        userNotFound={false}
        removeFilterForUser={() => {}}
      />
    );

    expect(
      wrapper.containsMatchingElement(
        <SearchBar
          text={"Search repositories by user... "}
          submitCallback={stubbedLoadReposAndNavigateToRepos}
        />
      )
    ).toBe(true);
  });

  it("should trigger search when the search field is not empty", () => {
    const onSearchButtonClick = sinon.spy();
    const wrapper = mount(
      <UserSearchView
        loadReposAndNavigateToRepos={onSearchButtonClick}
        userNotFound={false}
        removeFilterForUser={() => {}}
      />
    );
    wrapper.find("input").simulate("change", { target: { value: "someuser" } });
    wrapper
      .find("button")
      .first()
      .simulate("click");
    expect(onSearchButtonClick.calledOnce).toBe(true);
  });
});
