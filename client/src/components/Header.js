import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";

class Header extends React.Component {
  renderAuth() {
    if (!this.props.auth.user) {
      return (
        <>
          <a href="/api/v1/auth/google" className="ui google plus button">
            <i className="google icon"></i>
            Sign In With Google
          </a>
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => this.props.signOut()}
            className="ui primary button"
          >
            <i className="sign out icon"></i>
            Sign Out
          </button>
        </>
      );
    }
  }

  render() {
    return (
      <div className="ui borderless large menu">
        <NavLink to="/home" className="item logo">
          Job Tracker
        </NavLink>
        <div className="right menu">
          <div className="item">{this.renderAuth()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { signOut })(Header);
