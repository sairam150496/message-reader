import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { MessageReaderContainer } from "../containers";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact strict component={MessageReaderContainer} />
      </Switch>
    </Router>
  );
};
