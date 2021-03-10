import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMeetings } from "../../actions";
import CreateMeeting from "./CreateMeeting";
import requireAuth from "../requireAuth";
import EditMeeting from "./EditMeeting";

class MeetingList extends React.Component {
  componentDidMount() {
    if (this.props.oppId) {
      this.props.fetchMeetings(this.props.oppId);
    } else {
      this.props.fetchMeetings();
    }
  }

  renderMeetings() {
    let meetingList;
    if (this.props.oppId) {
      meetingList = this.props.meetings.filter(
        (meeting) => meeting.opportunity._id === this.props.oppId
      );
    } else {
      meetingList = this.props.meetings;
    }
    return meetingList.map((meeting) => {
      return (
        <tr key={"meeting-" + meeting._id}>
          <td style={{ paddingLeft: "0.7em" }}>
            <EditMeeting meetingId={meeting._id} />
            {meeting.topic}
          </td>
          <td>
            {meeting.meetingDate
              ? new Date(meeting.meetingDate).toISOString().split("T")[0]
              : ""}
          </td>
          <td>{meeting.opportunity ? meeting.opportunity.name : ""}</td>
          <td>{meeting.contact ? meeting.contact.name : ""}</td>
          <td>{meeting.notes}</td>
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
          <h3 style={{ marginBottom: "0" }}>Meetings</h3>
          <CreateMeeting oppId={this.props.oppId} />
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
                  Topic
                </th>
                <th className="two wide">Date</th>
                <th className="three wide">Opportunity</th>
                <th className="two wide">Contact</th>
                <th className="six wide">Notes</th>
              </tr>
            </thead>
            <tbody>{this.renderMeetings()}</tbody>
            <tfoot className="full-width">
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

MeetingList = requireAuth(MeetingList);

const mapStateToProps = (state) => {
  return {
    meetings: Object.values(state.meetings.data),
    inProgress: state.meetings.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchMeetings,
})(MeetingList);
