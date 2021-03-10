import React from "react";
import ActivityFeed from "../activities/ActivityFeed";
import ContactList from "../contacts/ContactList";
import MeetingList from "../meetings/MeetingList";
import NoteList from "../notes/NoteList";

class OpportunityRelated extends React.Component {
  render() {
    return (
      <div className="ui stackable grid">
        <div className="ten wide column">
          <ContactList oppId={this.props.oppId} />
          <MeetingList oppId={this.props.oppId} />
          <NoteList oppId={this.props.oppId} />
        </div>
        <div className="six wide column">
          <ActivityFeed oppId={this.props.oppId} />
        </div>
      </div>
    );
  }
}

export default OpportunityRelated;
