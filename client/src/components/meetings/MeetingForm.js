import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchOpportunities, fetchContacts } from "../../actions";
import { Form } from "semantic-ui-react";

class MeetingForm extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities();
    this.props.fetchContacts();
  }

  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options, disabled, label, meta }) {
    const optionsArray = options.map((opt) => {
      return { key: opt._id, text: opt.name, value: opt._id };
    });
    const errorClass = meta.error && meta.touched ? "error" : null;
    return (
      <div className={`field ${errorClass}`}>
        <label>{label}</label>
        {options.length === 0 ? null : (
          <Form.Select
            {...input}
            fluid
            selection
            options={optionsArray}
            onChange={(e, { value }) => input.onChange(value)}
            disabled={disabled}
            clearable={true}
          />
        )}
        {meta.error && meta.touched ? (
          <span style={{ color: "#9F3A38" }}>{meta.error}</span>
        ) : null}
      </div>
    );
  }

  renderInput({ input, label, meta, type }) {
    const errorClass = meta.error && meta.touched ? "error" : null;
    return (
      <div className={`field ${errorClass}`}>
        <label>{label}</label>
        <input {...input} type={type}></input>
        {meta.error && meta.touched ? (
          <span style={{ color: "#9F3A38" }}>{meta.error}</span>
        ) : null}
      </div>
    );
  }

  renderTextArea({ input, label, meta, rows }) {
    const errorClass = meta.error && meta.touched ? "error" : null;
    return (
      <div className={`field ${errorClass}`}>
        <label>{label}</label>
        <textarea {...input} rows={rows}></textarea>
        {meta.error && meta.touched ? (
          <span style={{ color: "#9F3A38" }}>{meta.error}</span>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <form
        id="meetingForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <Field
          name="topic"
          component={this.renderInput}
          type="text"
          label="Meeting Topic"
        />
        <Field
          name="meetingDate"
          component={this.renderInput}
          type="date"
          label="Meeting Date"
        />
        <Field
          name="contact"
          component={this.renderDropdown}
          options={this.props.contacts}
          label="Contact"
        />
        <Field
          name="opportunity"
          component={this.renderDropdown}
          options={this.props.opportunities}
          disabled={this.props.initialValues ? true : false}
          label="What opportunity is this related to?"
        />
        <Field
          name="notes"
          component={this.renderTextArea}
          rows="5"
          label="Notes"
        />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.topic) {
    errors.topic = "Describe why you are meeting";
  }
  if (!formValues.meetingDate) {
    errors.meetingDate = "Enter a meeting date";
  }
  if (!formValues.contact) {
    errors.contact = "Select who you are meeting with";
  }
  if (!formValues.opportunity) {
    errors.opportunity = "Select related opportunity";
  }
  if (!formValues.notes) {
    errors.notes = "Fill out any relevant notes";
  }
  return errors;
};

MeetingForm = reduxForm({
  form: "meetingForm",
  validate: validate,
})(MeetingForm);

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
    contacts: Object.values(state.contacts.data),
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
  fetchContacts,
})(MeetingForm);
