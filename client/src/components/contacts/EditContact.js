import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { editContact } from "../../actions";
import ContactForm from "./ContactForm";
import _ from "lodash";

class EditContact extends React.Component {
  state = { open: false };
  changeModalState = (val) => {
    this.setState({ open: val });
  };
  onSubmit = (formValues) => {
    this.props.editContact(
      this.props.contactId,
      _.omit(formValues, "opportunity")
    );
  };
  render() {
    let initValues = { ...this.props.contacts[this.props.contactId] };

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
        <Modal.Header>Edit Contact</Modal.Header>
        <Modal.Content>
          <div>
            <ContactForm
              closeModal={this.changeModalState}
              onSubmit={this.onSubmit}
              initialValues={_.pick(initValues, [
                "name",
                "role",
                "email",
                "phone",
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
            form="contactForm"
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
    contacts: state.contacts.data,
  };
};

export default connect(mapStateToProps, { editContact })(EditContact);
