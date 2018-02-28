import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { CommitListView, RepoListView, UserSearchView } from "../views";

export default (
  <Switch>
    <Route exact path="/" component={() => <Redirect to="/search" />} />
    <Route path="/search" component={UserSearchView} />
    <Route path="/user/:username/repos" component={RepoListView} />
    <Route path="/repos/:owner/:repo/commits" component={CommitListView} />
  </Switch>
);
