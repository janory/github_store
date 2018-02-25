import React from "react";
import { Redirect, Route } from "react-router-dom";
import { RepoDetailsView, RepoListView, UserSearchView } from "../views";

export default (
  <div>
    <Route exact path="/" component={() => <Redirect to="/search" />} />
    <Route path="/search" component={UserSearchView} />
    <Route path="/user/:username/repos" component={RepoListView} />
    <Route path="/repos/:owner/:repo/commits" component={RepoDetailsView} />
  </div>
);
