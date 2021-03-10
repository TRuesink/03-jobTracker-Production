import React from "react";
import DeleteOpportunity from "./DeleteOpportunity";
import EditOpportunity from "./EditOpportunity";

class OpportunityHeader extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        className="ui segment"
      >
        {this.props.opp ? (
          <>
            <h1 className="ui header">
              {this.props.opp.name}

              <div className="sub header">
                {this.props.opp.industry} | {this.props.opp.size} |{" "}
                {this.props.opp.location}
              </div>
            </h1>
          </>
        ) : null}
        <div>
          <DeleteOpportunity opp={this.props.opp} />
          <EditOpportunity opp={this.props.opp} />
        </div>
      </div>
    );
  }
}
export default OpportunityHeader;
