import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchActivities } from "../../actions";
import CreateActivity from "./CreateActivity";
import requireAuth from "../requireAuth";
import EditActivity from "./EditActivity";

class ActivityList extends React.Component {
  componentDidMount() {
    this.props.fetchActivities();
  }

  renderActivities() {
    return this.props.activities
      .sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      })
      .map((act) => {
        return (
          <tr key={"activity-" + act._id}>
            <td style={{ paddingLeft: "0.7em" }}>
              <EditActivity activityId={act._id} />
              {act.opportunity.name}
            </td>
            <td>{act.contact ? act.contact.name : ""}</td>
            <td>{act.description}</td>
            <td>
              {Math.floor(
                (new Date() - Date.parse(act.createdAt)) / (1000 * 60 * 60 * 24)
              )}{" "}
              days ago
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
          <h3 style={{ marginBottom: "0" }}>Activites</h3>
          <CreateActivity />
        </div>

        <div
          style={{
            padding: "0",
          }}
          className="ui segment"
        >
          <div className={loaderClass}></div>
          <table className="ui compact small very basic table">
            <thead className="full-width">
              <tr>
                <th style={{ paddingLeft: "0.7em" }} className="three wide">
                  Opportunity
                </th>
                <th className="two wide">Contact</th>
                <th className="nine wide">Description</th>
                <th className="two wide">Date</th>
              </tr>
            </thead>
            <tbody>{this.renderActivities()}</tbody>
            <tfoot className="full-width">
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

ActivityList = requireAuth(ActivityList);

const mapStateToProps = (state) => {
  return {
    activities: Object.values(state.activities.data),
    inProgress: state.activities.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchActivities,
})(ActivityList);
