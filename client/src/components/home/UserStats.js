import React from "react";
import { connect } from "react-redux";

class UserStats extends React.Component {
  render() {
    return (
      <div className="ui center aligned segment">
        <div className="ui four statistics">
          <div className="statistic">
            <div className="value">{this.props.opportunities.length}</div>
            <div className="label">
              {this.props.opportunities.length === 1
                ? "Opportunity"
                : "Opportunities"}
            </div>
          </div>
          <div className="statistic">
            <div className="value">{this.props.activities.length}</div>
            <div className="label">
              {this.props.activities.length === 1 ? "Activity" : "Activities"}
            </div>
          </div>
          <div className="statistic">
            <div className="value">{this.props.contacts.length}</div>
            <div className="label">
              {this.props.contacts.length === 1 ? "Contact" : "Contacts"}
            </div>
          </div>
          <div className="statistic">
            <div className="value">{this.props.meetings.length}</div>
            <div className="label">
              {this.props.meetings.length === 1 ? "Meeting" : "Meetings"}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
    activities: Object.values(state.activities.data),
    contacts: Object.values(state.contacts.data),
    meetings: Object.values(state.meetings.data),
  };
};

export default connect(mapStateToProps)(UserStats);
