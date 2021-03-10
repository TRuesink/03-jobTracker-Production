import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { editMeeting } from "../../actions";
import MeetingForm from "./MeetingForm";
import _ from "lodash";

class EditMeeting extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.editMeeting(
      this.props.meetingId,
      _.omit(formValues, "opportunity")
    );
  };
  render() {
    let initValues = { ...this.props.meetings[this.props.meetingId] };

    initValues.opportunity = initValues.opportunity.id;
    initValues.contact = initValues.contact.id;
    const date = new Date(initValues.meetingDate);
    initValues.meetingDate = date.toISOString().split("T")[0];
    return (
      <Modal
        onClose={() => this.changeModalState(false)}
        onOpen={() => this.changeModalState(true)}
        open={this.state.open}
        trigger={
          <Button style={{ padding: "0.5em" }} className="mini icon">
            <i className="edit icon"></i>
          </Button>
        }
      >
        <Modal.Header>Edit Meeting</Modal.Header>
        <Modal.Content>
          <div>
            <MeetingForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
              initialValues={_.pick(initValues, [
                "topic",
                "meetingDate",
                "contact",
                "opportunity",
                "notes",
              ])}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="meetingForm"
            content="Save"
            labelPosition="right"
            icon="checkmark"
            // onClick={() => this.onCloseModal()}
            primary
          />
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    meetings: state.meetings.data,
  };
};

export default connect(mapStateToProps, { editMeeting })(EditMeeting);
