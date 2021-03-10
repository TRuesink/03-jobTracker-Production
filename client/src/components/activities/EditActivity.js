import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { editActivity } from "../../actions";
import ActivityForm from "./ActivityForm";
import _ from "lodash";

class EditActivity extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.editActivity(
      this.props.activityId,
      _.omit(formValues, "opportunity")
    );
  };
  render() {
    let initValues = { ...this.props.activities[this.props.activityId] };

    initValues.opportunity = initValues.opportunity.id;
    const date = new Date(initValues.createdAt);
    initValues.createdAt = date.toISOString().split("T")[0];
    if (initValues.contact) {
      initValues.contact = initValues.contact.id;
    }

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
        <Modal.Header>Edit Contact</Modal.Header>
        <Modal.Content>
          <div>
            <ActivityForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
              initialValues={_.pick(initValues, [
                "contact",
                "description",
                "createdAt",
                "opportunity",
              ])}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="activityForm"
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
    activities: state.activities.data,
  };
};

export default connect(mapStateToProps, { editActivity })(EditActivity);
