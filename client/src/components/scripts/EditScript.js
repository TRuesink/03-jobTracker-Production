import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { editScript } from "../../actions";
import ScriptForm from "./ScriptForm";
import _ from "lodash";

class EditScript extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.editScript(this.props.scriptId, formValues);
  };
  render() {
    let initValues = { ...this.props.scripts[this.props.scriptId] };
    return (
      <Modal
        onClose={() => this.changeModalState(false)}
        onOpen={() => this.changeModalState(true)}
        open={this.state.open}
        trigger={<Button className="right floated primary">Edit</Button>}
      >
        <Modal.Header>Edit Script</Modal.Header>
        <Modal.Content>
          <div>
            <ScriptForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
              initialValues={_.pick(initValues, [
                "purpose",
                "recipient",
                "mode",
                "message",
              ])}
            />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            Cancel
          </Button>
          <Button
            form="scriptForm"
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
    scripts: state.scripts.data,
  };
};

export default connect(mapStateToProps, { editScript })(EditScript);
