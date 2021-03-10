import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchActivities } from "../../actions";
import CreateActivity from "./CreateActivity";

class ActivityFeed extends React.Component {
  componentDidMount() {
    if (this.props.oppId) {
      this.props.fetchActivities(this.props.oppId);
    } else {
      this.props.fetchActivities();
    }
  }

  renderActivities() {
    let activityList;
    if (this.props.oppId) {
      activityList = this.props.activities.filter(
        (act) => act.opportunity._id === this.props.oppId
      );
    } else {
      activityList = this.props.activities;
    }
    return activityList
      .sort((a, b) => {
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      })
      .map((act) => {
        return (
          <div key={act._id} className="event">
            <div className="content">
              <div className="summary">
                <Link to={`/jobs/opportunities/${act.opportunity._id}`}>
                  {act.opportunity.name}
                </Link>{" "}
                - {act.description}
                <div className="date">
                  {Math.floor(
                    (new Date() - Date.parse(act.createdAt)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days ago
                </div>
              </div>
            </div>
          </div>
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
          <h3 style={{ marginBottom: "0" }}>Activity Feed</h3>
          <CreateActivity oppId={this.props.oppId} />
        </div>
        <div className="ui segment">
          <div className="ui feed small">{this.renderActivities()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    activities: Object.values(state.activities.data),
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchActivities })(ActivityFeed);
