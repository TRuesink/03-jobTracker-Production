import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { editNote } from "../../actions";
import NoteForm from "./NoteForm";
import _ from "lodash";

class EditNote extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.editNote(this.props.noteId, _.omit(formValues, "opportunity"));
  };
  render() {
    let initValues = { ...this.props.notes[this.props.noteId] };

    initValues.opportunity = initValues.opportunity.id;
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
        <Modal.Header>Edit Note</Modal.Header>
        <Modal.Content>
          <div>
            <NoteForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
              initialValues={_.pick(initValues, ["opportunity", "content"])}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="noteForm"
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
    notes: state.notes.data,
  };
};

export default connect(mapStateToProps, { editNote })(EditNote);
