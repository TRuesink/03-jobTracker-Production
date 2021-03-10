import React from "react";
import { NavLink } from "react-router-dom";
import requireAuth from "./requireAuth";

class SideMenu extends React.Component {
  render() {
    return (
      <div className="ui left fluid vertical menu">
        <NavLink to="/jobs/home" className="item">
          Home
        </NavLink>
        <NavLink to="/jobs/opportunities" className="item">
          Opportunities
        </NavLink>
        <NavLink to="/jobs/activities" className="item">
          Activities
        </NavLink>
        <NavLink to="/jobs/contacts" className="item">
          Contacts
        </NavLink>
        <NavLink to="/jobs/meetings" className="item">
          Meetings
        </NavLink>
        <NavLink to="/jobs/scripts" className="item">
          Scripts
        </NavLink>
        <NavLink to="/jobs/notes" className="item">
          Notes
        </NavLink>
      </div>
    );
  }
}

export default requireAuth(SideMenu);
