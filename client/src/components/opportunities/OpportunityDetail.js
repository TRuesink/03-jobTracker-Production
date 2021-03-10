import React from "react";
import OpportunityPath from "./OpportunityPath";
import { connect } from "react-redux";
import { fetchOpportunity } from "../../actions";
import OpportunityHeader from "./OpportunityHeader";
import OpportunityRelated from "./OpportunityRelated";
import requireAuth from "../requireAuth";

class OpportunityDetail extends React.Component {
  componentDidMount() {
    this.props.fetchOpportunity(this.props.match.params.id);
  }
  render() {
    return (
      <div>
        <OpportunityHeader opp={this.props.opportunity} />
        <OpportunityPath opp={this.props.opportunity} />
        <OpportunityRelated oppId={this.props.match.params.id} />
      </div>
    );
  }
}

OpportunityDetail = requireAuth(OpportunityDetail);

const mapStateToProps = (state, ownProps) => {
  return {
    opportunity: state.opportunities.data[ownProps.match.params.id],
  };
};

export default connect(mapStateToProps, { fetchOpportunity })(
  OpportunityDetail
);
