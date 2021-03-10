import React from "react";
import { connect } from "react-redux";
import { editOpportunity } from "../../actions";

const stageSteps = [
  "research",
  "info meeting",
  "screening interview",
  "technical interview",
  "negotiation",
  "won",
  "lost",
];

class OpportunityPath extends React.Component {
  renderSteps() {
    const currentStage = this.props.opp ? this.props.opp.stage : "research";
    return stageSteps.map((stg) => {
      return (
        <a
          onClick={() =>
            this.props.editOpportunity(this.props.opp._id, { stage: stg })
          }
          key={stg}
          className={`step ${stg === currentStage ? "active" : ""}`}
        >
          <div className="content">
            <div className="title">{stg}</div>
          </div>
        </a>
      );
    });
  }
  render() {
    return (
      <div className="ui basic segment">
        <div className="ui mini seven steps">{this.renderSteps()}</div>
        <div
          className={`ui ${
            this.props.inProgress ? "active" : "disabled"
          } inverted dimmer`}
        >
          <div className="ui loader"></div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inProgress: state.opportunities.inProgress,
  };
};

export default connect(mapStateToProps, { editOpportunity })(OpportunityPath);
