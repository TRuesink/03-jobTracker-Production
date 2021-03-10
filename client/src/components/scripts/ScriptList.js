import React from "react";
import _ from "lodash";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchScripts } from "../../actions";
import CreateScript from "./CreateScript";
import requireAuth from "../requireAuth";
import EditScript from "./EditScript";

class ScriptList extends React.Component {
  componentDidMount() {
    this.props.fetchScripts();
  }

  renderScripts() {
    return this.props.scripts.map((script) => {
      return (
        <div className="item" key={"script-" + script._id}>
          <div className="content">
            <div className="header">{script.purpose}</div>
            <div className="meta">
              <span className="cinema">Recipient: {script.recipient}</span>
            </div>
            <div className="description">
              <p>{script.message}</p>
            </div>
            <div className="extra">
              <EditScript scriptId={script._id} />
              <div className="ui label">{script.mode}</div>
              <div className="ui label">
                Used: {script.activities.length} times
              </div>
            </div>
          </div>
        </div>
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
          <h3 style={{ marginBottom: "0" }}>Scripts</h3>
          <CreateScript />
        </div>

        <div className="ui segment">
          <div className={loaderClass}></div>
          <div className="ui divided items">{this.renderScripts()}</div>
        </div>
      </div>
    );
  }
}

ScriptList = requireAuth(ScriptList);

const mapStateToProps = (state) => {
  return {
    scripts: Object.values(state.scripts.data),
    inProgress: state.scripts.inProgress,
  };
};

export default connect(mapStateToProps, {
  fetchScripts,
})(ScriptList);
