import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchNotes } from "../../actions";
import CreateNote from "./CreateNote";
import requireAuth from "../requireAuth";
import EditNote from "./EditNote";

class NoteList extends React.Component {
  componentDidMount() {
    if (this.props.oppId) {
      this.props.fetchNotes(this.props.oppId);
    } else {
      this.props.fetchNotes();
    }
  }

  renderNotes() {
    let noteList;
    if (this.props.oppId) {
      noteList = this.props.notes.filter(
        (note) => note.opportunity._id === this.props.oppId
      );
    } else {
      noteList = this.props.notes;
    }
    return noteList.map((note) => {
      return (
        <tr key={"note-" + note._id}>
          <td style={{ paddingLeft: "0.7em" }}>
            <EditNote noteId={note._id} />
            {note.opportunity.name}
          </td>
          <td>{note.content}</td>
          <td>{new Date(note.createdAt).toLocaleDateString()}</td>
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
          <h3 style={{ marginBottom: "0" }}>Notes</h3>
          <CreateNote oppId={this.props.oppId} />
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
                <th className="eleven wide">Note</th>
                <th className="two wide">Date</th>
              </tr>
            </thead>
            <tbody>{this.renderNotes()}</tbody>
            <tfoot className="full-width">
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

NoteList = requireAuth(NoteList);

const mapStateToProps = (state) => {
  return {
    notes: Object.values(state.notes.data),
    inProgress: state.notes.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchNotes,
})(NoteList);
