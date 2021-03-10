import React from "react";
import { Field, reduxForm, SubmissionError } from "redux-form";
import { Form } from "semantic-ui-react";

const stageOptions = [
  {
    key: "research",
    text: "research",
    value: "research",
  },
  {
    key: "info meeting",
    text: "info meeting",
    value: "info meeting",
  },
  {
    key: "screening interview",
    text: "screening interview",
    value: "screening interview",
  },
  {
    key: "technical interview",
    text: "technical interview",
    value: "technical interview",
  },
  {
    key: "negotiation",
    text: "negotiation",
    value: "negotiation",
  },
  {
    key: "won",
    text: "won",
    value: "won",
  },
  {
    key: "lost",
    text: "lost",
    value: "lost",
  },
];

const sizeOptions = [
  {
    key: "1-10",
    text: "1-10",
    value: "1-10",
  },
  {
    key: "11-50",
    text: "11-50",
    value: "11-50",
  },
  {
    key: "51-100",
    text: "51-100",
    value: "51-100",
  },
  {
    key: "101-200",
    text: "101-200",
    value: "101-200",
  },
  {
    key: "201-500",
    text: "201-500",
    value: "201-500",
  },
  {
    key: "501-1000",
    text: "501-1000",
    value: "501-1000",
  },
  {
    key: "1001-5000",
    text: "1001-5000",
    value: "1001-5000",
  },
  {
    key: "5001-10000",
    text: "5001-10000",
    value: "5001-10000",
  },
];

const industryOptions = [
  {
    key: "healthcare",
    text: "healthcare",
    value: "healthcare",
  },
  {
    key: "finance",
    text: "finance",
    value: "finance",
  },
  {
    key: "internet",
    text: "internet",
    value: "internet",
  },
  {
    key: "insurance",
    text: "insurance",
    value: "insurance",
  },
  {
    key: "technology",
    text: "technology",
    value: "technology",
  },
  {
    key: "other",
    text: "other",
    value: "other",
  },
];

class OpportunityForm extends React.Component {
  onFormSubmit = (formValues) => {
    this.props.onSubmit(formValues);
    this.props.closeModal(false);
  };

  renderDropdown({ input, options, meta, label }) {
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
    console.log(this.props);
    return (
      <form
        id="oppForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <div className="ui error message">
          <div className="header">Action Forbidden</div>
          <p>
            You can only sign up for an account once with a given e-mail
            address.
          </p>
        </div>
        <div className="two fields">
          <Field
            name="name"
            type="text"
            component={this.renderInput}
            label="Name"
          />
          <Field
            name="size"
            component={this.renderDropdown}
            options={sizeOptions}
            label="Size"
          />
        </div>
        <div className="two fields">
          <Field
            name="location"
            component={this.renderInput}
            type="text"
            label="Location"
          />
          <Field
            name="industry"
            component={this.renderDropdown}
            options={industryOptions}
            label="Industry"
          />
        </div>
        <div className="two fields">
          <Field
            name="stage"
            component={this.renderDropdown}
            options={stageOptions}
            label="Stage"
          />
          <Field
            name="about"
            rows="3"
            component={this.renderTextArea}
            label="About"
          />
        </div>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.name) {
    errors.name = "Enter an opportunity name";
  }
  if (!formValues.size) {
    errors.size = "Enter employee count of company";
  }
  if (!formValues.location) {
    errors.location = "Enter location of opportunity";
  }
  if (!formValues.industry) {
    errors.industry = "Enter industry of opportunity";
  }
  if (!formValues.stage) {
    errors.stage = "Enter the current stage opportunity is in";
  }
  if (!formValues.about) {
    errors.about = "Describe the company / opportunity";
  }
  console.log(errors);
  return errors;
};

export default reduxForm({
  form: "opportunityForm",
  validate: validate,
})(OpportunityForm);
