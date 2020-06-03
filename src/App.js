import React, { Component } from "react";
import { Link, Route, Switch } from "react-router-dom";
import Leaders from "./Leaders";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <ul className="nav navbar-nav">
            <li className="nav-item">
              <Link to="/">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/leaders">Leaderboard</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route exact path="/" component={About} />
          <Route path="/leaders" component={Leaders} />
        </Switch>
      </div>
    );
  }
}

const About = (props) => (
  <div>
    <h3>Welcome! At the Leaderboard page you will find:</h3>
    <dl>
      <dt>Leaderboard</dt>
      <dd>
        - Show a list of all creators sorted by highest open status first and
        won status second.
      </dd>
      <dt>Deal distribution</dt>
      <dd>
        - Show distribution of deals by count grouped by status (open, close,
        won)
      </dd>
      <dt>Open Deals</dt>
      <dd>- Show a list of open deals sort by value</dd>
      <dt> View details </dt>
      <dd>
        - Show details of deals distribution and most valuable open deals under
        each creator
      </dd>
    </dl>
  </div>
);

export default App;
