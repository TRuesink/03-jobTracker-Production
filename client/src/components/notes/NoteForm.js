import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { fetchOpportunities } from "../../actions";
import { Form } from "semantic-ui-react";

class NoteForm extends React.Component {
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
  renderTextArea({ input, meta, label }) {
    const errorClass = meta.error && meta.touched ? "error" : null;
    return (
      <div className={`field ${errorClass}`}>
        <label>{label}</label>
        <textarea {...input} rows="7"></textarea>
        {meta.error && meta.touched ? (
          <span style={{ color: "#9F3A38" }}>{meta.error}</span>
        ) : null}
      </div>
    );
  }

  render() {
    return (
      <form
        id="noteForm"
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
        className="ui form"
      >
        <Field
          name="opportunity"
          component={this.renderDropdown}
          options={this.props.opportunities}
          disabled={this.props.initialValues ? true : false}
          label="What opportunity is this related to?"
        />
        <Field name="content" component={this.renderTextArea} label="Note" />
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.opportunity) {
    errors.opportunity = "Please select related opportunity";
  }
  if (!formValues.content) {
    errors.content = "Fill out note";
  }
  return errors;
};

NoteForm = reduxForm({
  form: "noteForm",
  validate: validate,
})(NoteForm);

const mapStateToProps = (state) => {
  return {
    opportunities: Object.values(state.opportunities.data),
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
})(NoteForm);
