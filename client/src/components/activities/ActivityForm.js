import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import {
  fetchContacts,
  fetchOpportunities,
  fetchScripts,
  createActivity,
} from "../../actions";
import { Dropdown, Form } from "semantic-ui-react";

class ActivityForm extends React.Component {
  componentDidMount() {
    this.props.fetchContacts();
    this.props.fetchOpportunities();
    this.props.fetchScripts();
  }

  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options, disabled, label, meta }) {
    const optionsArray = options.map((opt) => {
      return {
        key: opt._id || opt.purpose,
        text: opt.name || opt.purpose,
        value: opt._id,
      };
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

  renderInput({ input, meta, label, type }) {
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

  renderTextArea({ input, meta, label, rows }) {
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
        id="activityForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <Field
          name="createdAt"
          component={this.renderInput}
          type="date"
          label="Activity Date"
        />
        <Field
          name="opportunity"
          component={this.renderDropdown}
          options={this.props.opportunities}
          label="What opportunity is this related to?"
          disabled={this.props.initialValues ? true : false}
        />
        <Field
          name="contact"
          component={this.renderDropdown}
          options={this.props.contacts}
          label="Contact (if applicable)"
        />
        <Field
          name="script"
          component={this.renderDropdown}
          options={this.props.scripts}
          label="Script (if applicable)"
        />
        <Field
          name="description"
          component={this.renderTextArea}
          label="What you did"
          rows="3"
        />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.createdAt) {
    errors.createdAt = "Specify when activity was completed";
  }
  if (!formValues.opportunity) {
    errors.opportunity = "Specify related opportunity";
  }
  if (!formValues.description) {
    errors.description = "Describe what you did";
  }
  return errors;
};

ActivityForm = reduxForm({
  form: "activityForm",
  validate: validate,
})(ActivityForm);

const mapStateToProps = (state) => {
  return {
    contacts: Object.values(state.contacts.data),
    opportunities: Object.values(state.opportunities.data),
    scripts: Object.values(state.scripts.data),
  };
};

export default connect(mapStateToProps, {
  fetchContacts,
  fetchOpportunities,
  createActivity,
  fetchScripts,
})(ActivityForm);
