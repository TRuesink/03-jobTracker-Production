import React from "react";
import { Button, Header, Image, Modal } from "semantic-ui-react";
import { connect } from "react-redux";
import { deleteOpportunity } from "../../actions";

class DeleteOpportunity extends React.Component {
  state = { open: false };

  changeModalState = (val) => {
    this.setState({ open: val });
  };

  render() {
    return (
      <Modal
        onClose={() => this.changeModalState(false)}
        onOpen={() => this.changeModalState(true)}
        open={this.state.open}
        trigger={<Button className="right floated red basic">Delete</Button>}
      >
        <Modal.Header>Delete Opportunity</Modal.Header>
        <Modal.Content>
          <div>Are you sure you want to delete this opportunity?</div>
        </Modal.Content>
        <Modal.Actions>
          <Button color="red" onClick={() => this.changeModalState(false)}>
            No
          </Button>
          <Button
            color="green"
            onClick={() => {
              this.props.deleteOpportunity(this.props.opp._id);
              this.changeModalState(false);
            }}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default connect(null, { deleteOpportunity })(DeleteOpportunity);
