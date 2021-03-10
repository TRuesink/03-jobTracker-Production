import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { createScript } from "../../actions";
import ScriptForm from "./ScriptForm";
import _ from "lodash";

class CreateScript extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.createScript(formValues);
  };
  render() {
    return (
      <Modal
        onClose={() => this.changeModalState(false)}
        onOpen={() => this.changeModalState(true)}
        open={this.state.open}
        trigger={
          <Button className="right floated primary basic icon">
            <i className="plus icon"></i>
          </Button>
        }
      >
        <Modal.Header>Create A Script</Modal.Header>
        <Modal.Content>
          <div>
            <ScriptForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="scriptForm"
            content="Submit"
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

export default connect(null, { createScript })(CreateScript);
