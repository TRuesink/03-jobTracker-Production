import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { editOpportunity } from "../../actions";
import OpportunityForm from "./OpportunityForm";

class EditOpportunity extends React.Component {
  state = { open: false };

  changeModalState = (val) => {
    this.setState({ open: val });
  };

  onSubmit = (formValues) => {
    this.props.editOpportunity(this.props.opp._id, formValues);
  };

  render() {
    return (
      <Modal
        onClose={() => this.changeModalState(false)}
        onOpen={() => this.changeModalState(true)}
        open={this.state.open}
        trigger={<Button className="right floated primary basic">Edit</Button>}
      >
        <Modal.Header>Edit Opportunity</Modal.Header>
        <Modal.Content>
          <div>
            <OpportunityForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
              initialValues={this.props.opp}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="oppForm"
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

export default connect(null, { editOpportunity })(EditOpportunity);
