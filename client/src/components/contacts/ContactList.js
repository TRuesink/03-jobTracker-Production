import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchContacts } from "../../actions";
import CreateContact from "./CreateContact";
import requireAuth from "../requireAuth";
import EditContact from "./EditContact";

class ContactList extends React.Component {
  componentDidMount() {
    if (this.props.oppId) {
      this.props.fetchContacts(this.props.oppId);
    } else {
      this.props.fetchContacts();
    }
  }

  renderContacts() {
    let contactList;
    if (this.props.oppId) {
      contactList = this.props.contacts.filter(
        (contact) => contact.opportunity._id === this.props.oppId
      );
    } else {
      contactList = this.props.contacts;
    }
    return contactList.map((contact) => {
      return (
        <tr key={"contact-" + contact._id}>
          <td style={{ paddingLeft: "0.7em" }}>
            <EditContact contactId={contact._id} />
            {contact.name}
          </td>
          <td>{contact.role}</td>
          <td>{contact.email}</td>
          <td>{contact.activities.length}</td>
          <td>{contact.opportunity.name}</td>
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
          <h3 style={{ marginBottom: "0" }}>Contacts</h3>
          <CreateContact oppId={this.props.oppId} />
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
                  Name
                </th>
                <th className="four wide">Role</th>
                <th className="four wide">Email</th>
                <th className="two wide">Touches</th>
                <th className="three wide">Opportunity</th>
              </tr>
            </thead>
            <tbody>{this.renderContacts()}</tbody>
            <tfoot className="full-width">
              <tr></tr>
            </tfoot>
          </table>
        </div>
      </div>
    );
  }
}

ContactList = requireAuth(ContactList);

const mapStateToProps = (state) => {
  return {
    contacts: Object.values(state.contacts.data),
    inProgress: state.contacts.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
})(ContactList);
