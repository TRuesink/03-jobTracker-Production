import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { Form } from "semantic-ui-react";

const recipientOptions = [
  {
    key: "talent acquisition",
    text: "talent acquisition",
    value: "talent acquisition",
  },
  {
    key: "management",
    text: "management",
    value: "management",
  },
  {
    key: "engineering",
    text: "engineering",
    value: "engineering",
  },
  {
    key: "other",
    text: "other",
    value: "other",
  },
];

const modeOptions = [
  {
    key: "email",
    text: "email",
    value: "email",
  },
  {
    key: "linkedIn",
    text: "linkedIn",
    value: "linkedIn",
  },
  {
    key: "other",
    text: "other",
    value: "other",
  },
];

class ScriptForm extends React.Component {
  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options, label, meta }) {
    const errorClass = meta.error && meta.touched ? "error" : null;
    return (
      <div className={`field ${errorClass}`}>
        <label>{label}</label>
        <Form.Select
          {...input}
          fluid
          selection
          options={options}
          onChange={(e, { value }) => input.onChange(value)}
          clearable={true}
        />
        {meta.error && meta.touched ? (
          <span style={{ color: "#9F3A38" }}>{meta.error}</span>
        ) : null}
      </div>
    );
  }

  renderInput({ input, meta, label }) {
    const errorClass = meta.error && meta.touched ? "error" : null;
    return (
      <div className={`field ${errorClass}`}>
        <label>{label}</label>
        <input {...input} type="text"></input>
        {meta.error && meta.touched ? (
          <span style={{ color: "#9F3A38" }}>{meta.error}</span>
        ) : null}
      </div>
    );
  }

  renderTextArea({ input, meta, label }) {
    const errorClass = meta.error && meta.touched ? "error" : null;
    return (
      <div className={`field ${errorClass}`}>
        <label>{label}</label>
        <textarea {...input} rows="9"></textarea>
        {meta.error && meta.touched ? (
          <span style={{ color: "#9F3A38" }}>{meta.error}</span>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <form
        id="scriptForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <Field
          name="purpose"
          component={this.renderInput}
          label="Purpose of Message"
        />
        <Field
          name="recipient"
          component={this.renderDropdown}
          options={recipientOptions}
          label="Recipient Type"
        />
        <Field
          name="mode"
          component={this.renderDropdown}
          options={modeOptions}
          label="Mode of Communication"
        />
        <Field name="message" component={this.renderTextArea} label="Script" />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.purpose) {
    errors.purpose = "Describe purpose of message";
  }
  if (!formValues.recipient) {
    errors.recipient = "What type of stakeholder are you messaging";
  }
  if (!formValues.mode) {
    errors.mode = "Select the mode of communication";
  }
  if (!formValues.message) {
    errors.message = "Fill out a message script here";
  }
  return errors;
};

export default reduxForm({
  form: "scriptForm",
  validate: validate,
})(ScriptForm);
