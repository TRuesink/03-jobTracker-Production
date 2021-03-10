import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";
import { fetchOpportunities, editOpportunity } from "../../actions";

import CreateOpportunity from "./CreateOpportunity";
import requireAuth from "../requireAuth";

const stageOptions = [
  {
    key: "research",
    text: "research",
    value: "research",
  },
  {
    key: "info meeting",
    text: "info meeting",
    value: "info meeting",
  },
  {
    key: "screening interview",
    text: "screening interview",
    value: "screening interview",
  },
  {
    key: "technical interview",
    text: "technical interview",
    value: "technical interview",
  },
  {
    key: "negotiation",
    text: "negotiation",
    value: "negotiation",
  },
  {
    key: "won",
    text: "won",
    value: "won",
  },
  {
    key: "lost",
    text: "lost",
    value: "lost",
  },
];

class OpportunityList extends React.Component {
  componentDidMount() {
    if (this.props.auth.signedIn) {
      this.props.fetchOpportunities();
    }
  }

  renderDropdown({ input, options }) {
    return (
      <Form.Select
        {...input}
        fluid
        selection
        options={options}
        onChange={(e, { value }) => input.onChange(value)}
      />
    );
  }

  renderOpportunities() {
    return this.props.opportunities
      .sort((a, b) => {
        if (a.stage === "lost" && b.stage !== "lost") {
          return 1;
        } else if (a.stage !== "lost" && b.stage === "lost") {
          return -1;
        } else {
          return 0;
        }
      })
      .map((opp) => {
        const colorClass = opp.stage !== "lost" ? "positive" : "negative";
        const statusClass = this.props.inProgress ? "disabled" : "";
        const lastActivity = opp.activities.sort(
          (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
        )[0];
        return (
          <tr key={opp._id} className={colorClass + " " + statusClass}>
            <td style={{ paddingLeft: "0.7em" }}>
              <Link to={`/jobs/opportunities/${opp._id}`}>{opp.name}</Link>
            </td>
            <td>
              <Form.Select
                selection
                options={stageOptions}
                onChange={(e, { value }) =>
                  this.props.editOpportunity(opp._id, { stage: value })
                }
                defaultValue={opp.stage}
                loading={false}
              />
            </td>
            <td>
              {lastActivity
                ? new Date(lastActivity.createdAt).toLocaleDateString()
                : "no activities"}
            </td>
          </tr>
        );
      });
  }

  render() {
    const loaderClass = this.props.inProgress
      ? "ui active loader"
      : "ui disabled loader";
    return (
      <div className="ui segments">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="ui secondary segment"
        >
          <h3 style={{ marginBottom: "0" }}>Opportunities</h3>
          <CreateOpportunity />
        </div>

        <div
          style={{
            padding: "0",
          }}
          className="ui segment"
        >
          <div className={loaderClass}></div>
          <table className="ui compact small selectable very basic table">
            <thead className="full-width">
              <tr>
                <th className="five wide" style={{ paddingLeft: "0.7em" }}>
                  Name
                </th>
                <th className="seven wide">Stage</th>
                <th className="four wide">Last Activity</th>
              </tr>
            </thead>
            <tbody>{this.renderOpportunities()}</tbody>
            <tfoot className="full-width">
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

OpportunityList = requireAuth(OpportunityList);

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
    inProgress: state.opportunities.inProgress,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
  editOpportunity,
})(OpportunityList);
