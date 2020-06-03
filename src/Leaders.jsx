import React from "react";
import { Link, Route } from "react-router-dom";
import _ from "lodash";
import Leader from "./Leader";
import leaders from "./data/leaders.json";

const Leaders = ({ match }) => {
  let result = leaders.reduce((accumulator, object) => {
    const key = object.creator.id;
    if (!accumulator[key]) {
      accumulator[key] = {
        deals: [],
        won: 0,
        lost: 0,
        open: 0,
        creatorId: key,
      };
      accumulator[key].deals = [];
    }
    var first =
      object.creator.firstName == null ? "" : object.creator.firstName;
    var last = object.creator.lastName == null ? "" : object.creator.lastName;
    accumulator[key].name = first + " " + last;
    accumulator[key][object.deal.status] += 1;
    accumulator[key].deals.push(object.deal);
    return accumulator;
  }, {});

  //sort first by open then by won
  result = _.orderBy(result, ["open", "won"], "desc");

  function DataRow(props) {
    return (
      <div className="table-data-row">
        <span> {props.rank} </span>{" "}
        <span>
          {" "}
          &nbsp;&nbsp;
          {props.name}
        </span>
        <span className="nr"> {props.open} </span>{" "}
        <span className="nr"> {props.won} </span>{" "}
        <span className="nr"> {props.lost} </span>{" "}
        <Link to={`${match.url}/${props.creatorId}`}>
          <button>
            <span className="nr"> view details </span>{" "}
          </button>
        </Link>
      </div>
    );
  }

  const dataRows = result.map((leader, idx) => {
    return (
      <DataRow
        rank={idx + 1}
        key={leader.name}
        creatorId={leader.creatorId}
        name={leader.name}
        open={leader.open}
        won={leader.won}
        lost={leader.lost}
      />
    );
  });

  return (
    <div className="inner-canvas">
      <h3> Leaderboard </h3>
      <div>
        <div className="table">
          <div className="table-header">
            <span> Rank </span> <span> Name </span> <span> Open </span>{" "}
            <span> Won </span> <span> Lost </span>
          </div>{" "}
          {dataRows}
        </div>{" "}
      </div>{" "}
      <Route
        path={`${match.url}/:creatorId`}
        render={(props) => <Leader data={leaders} {...props} />}
      />
      <Route
        exact
        path={match.url}
        render={(props) => <Leader data={leaders} {...props} />}
      />
    </div>
  );
};

export default Leaders;
