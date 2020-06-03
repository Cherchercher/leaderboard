import React from "react";
import Pie from "./components/PieSVG.jsx";
import _ from "lodash";

function TopDealRow(props) {
  return (
    <div className="table-data-row">
      <span> {props.rank} </span> <span className="nr"> {props.dealName} </span>{" "}
      <span className="nr"> {props.value} </span>{" "}
      <span className="nr"> {props.companyName} </span>{" "}
      <span className="nr"> {props.creatorName} </span>{" "}
    </div>
  );
}

const Leader = ({ match, data }) => {
  var name = data.find(
    (p) => p.creator.id === parseInt(match.params.creatorId)
  );
  if (name) {
    data = data.filter(
      (p) => p.creator.id === parseInt(match.params.creatorId)
    );
  }

  let topDeals = [];
  let openAmount = 0;
  let wonAmount = 0;
  let lostAmount = 0;
  let totalOpen = 0;
  let totalLost = 0;
  let totalWon = 0;

  data.forEach((element) => {
    var first =
      element.creator.firstName == null ? "" : element.creator.firstName;
    var last = element.creator.lastName == null ? "" : element.creator.lastName;
    topDeals.push({
      dealName: element.deal.title,
      companyName: element.company.name,
      value: element.deal.value,
      creatorName: first + " " + last,
      id: element.deal.id,
    });
    switch (element.deal.status) {
      case "open":
        openAmount += element.deal.value;
        totalOpen += 1;
        break;
      case "won":
        wonAmount += element.deal.value;
        totalWon += 1;
        // code block
        break;
      default:
        lostAmount += element.deal.value;
        totalLost += 1;
        break;
      // code block
    }
  });

  topDeals = _.orderBy(topDeals, "value", "desc").splice(0, 10);
  let totalAmount = openAmount + lostAmount + wonAmount;
  let totalCount = totalOpen + totalWon + totalLost;
  let valuePercentages = [
    { label: "open", value: Math.round((100 * openAmount) / totalAmount) },
    { label: "lost", value: Math.round((100 * lostAmount) / totalAmount) },
    { label: "won", value: Math.round((100 * wonAmount) / totalAmount) },
  ];

  let countPercentages = [
    { label: "open", value: Math.round((100 * totalOpen) / totalCount) },
    { label: "lost", value: Math.round((100 * totalLost) / totalCount) },
    { label: "won", value: Math.round((100 * totalWon) / totalCount) },
  ];

  const topDealsRows = topDeals.map((leader, idx) => {
    return (
      <TopDealRow
        rank={idx + 1}
        key={leader.id}
        dealName={leader.dealName}
        companyName={leader.companyName}
        value={leader.value}
        creatorName={leader.creatorName}
      />
    );
  });
  let headerDist;
  let headerTopDeals;

  if (name) {
    let fullName = name.creator.firstName + " " + name.creator.lastName;
    headerDist = <h3>distribution for {fullName}</h3>;
    headerTopDeals = <h3>Top 10 open deals to pursue for {fullName}</h3>;
  } else {
    headerDist = <h3>distribution (all deals)</h3>;
    headerTopDeals = <h3>Top 10 open deals to pursue (all deals)</h3>;
  }

  return (
    <div>
      {headerDist}
      <div className="splitscreen">
        <div className="left">
          <h4> by # of deals</h4>
          <span> total deals: {totalCount}</span>
          <Pie
            className="col-6"
            id={"chart-count"}
            data={countPercentages}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
        <div className="right">
          <h4> by value</h4>
          <span> total value: ${totalAmount}</span>
          <Pie
            id={"chart-value"}
            data={valuePercentages}
            width={200}
            height={200}
            innerRadius={60}
            outerRadius={100}
          />
        </div>
      </div>
      <div>
        {headerTopDeals}
        <div className="table" id="deals-to-pursue">
          <div className="table-header" id="deals-to-pursue-header">
            <span> Rank </span> <span> Deal Name </span> <span> Value </span>{" "}
            <span> Company </span> <span> Creator </span>
          </div>{" "}
          {topDealsRows}
        </div>{" "}
      </div>
    </div>
  );
};

export default Leader;
