import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import history from "../history";
import Header from "./Header";
import Home from "./home/Home";
import OpportunityList from "./opportunities/OpportunityList";
import SideMenu from "./SideMenu";

import { connect } from "react-redux";
import {
  getMe,
  fetchOpportunities,
  fetchActivities,
  fetchContacts,
  fetchMeetings,
} from "../actions";
import OpportunityDetail from "./opportunities/OpportunityDetail";
import ActivityList from "./activities/ActivityList";
import ContactList from "./contacts/ContactList";
import MeetingList from "./meetings/MeetingList";
import NoteList from "./notes/NoteList";
import ScriptList from "./scripts/ScriptList";
import requireAuth from "./requireAuth";
import OpportunityDeleted from "./opportunities/OpportunityDeleted";

class App extends React.Component {
  componentDidMount() {
    this.props.getMe();
  }
  // componentDidUpdate() {
  //   if (this.props.auth.user) {
  //     this.props.fetchOpportunities();
  //     this.props.fetchActivities();
  //     this.props.fetchContacts();
  //     this.props.fetchMeetings();
  //   }
  // }
  render() {
    return (
      <div>
        <Router history={history}>
          <Header />
          <div style={{ margin: "1rem" }} className="ui stackable grid">
            <div className="three wide column">
              <Route path="/jobs" component={SideMenu} />
            </div>
            <div className="thirteen wide column">
              <Switch>
                <Route path="/jobs/home" exact component={Home} />
                <Route
                  path="/jobs/opportunities/deleted"
                  exact
                  component={OpportunityDeleted}
                />
                <Route
                  path="/jobs/opportunities/:id"
                  exact
                  component={OpportunityDetail}
                />
                <Route
                  path="/jobs/opportunities"
                  exact
                  component={OpportunityList}
                />
                <Route path="/jobs/activities" exact component={ActivityList} />
                <Route path="/jobs/contacts" exact component={ContactList} />
                <Route path="/jobs/meetings" exact component={MeetingList} />
                <Route path="/jobs/notes" exact component={NoteList} />
                <Route path="/jobs/scripts" exact component={ScriptList} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  getMe,
  fetchOpportunities,
  fetchActivities,
  fetchContacts,
  fetchMeetings,
})(App);
