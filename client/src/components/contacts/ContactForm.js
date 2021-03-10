import React from "react";
import { Field, formValues, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchOpportunities } from "../../actions";
import { Form } from "semantic-ui-react";

const roleOptions = [
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

class ContactForm extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunities();
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

  renderRoleDropdown({ input, options, label, meta }) {
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

  render() {
    return (
      <form
        id="contactForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <Field name="name" component={this.renderInput} label="Name" />
        <Field
          name="role"
          component={this.renderRoleDropdown}
          label="Role"
          options={roleOptions}
        />
        <Field name="email" component={this.renderInput} label="Email" />
        <Field name="phone" component={this.renderInput} label="Phone Number" />
        <Field
          name="opportunity"
          component={this.renderDropdown}
          options={this.props.opportunities}
          disabled={this.props.initialValues ? true : false}
          label="What opportunity is this related to?"
        />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Enter a contact name";
  }
  if (!formValues.role) {
    errors.role = "Enter a contact role";
  }
  if (!formValues.opportunity) {
    errors.opportunity = "Specify which opportunity this is related to";
  }
  return errors;
};

ContactForm = reduxForm({
  form: "contactForm",
  validate: validate,
})(ContactForm);

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
})(ContactForm);
