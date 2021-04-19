import { v4 } from "uuid";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { MessageReaderContainer } from "../containers";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          key={v4()}
          exact
          strict
          component={MessageReaderContainer}
        />
      </Switch>
    </Router>
  );
};
