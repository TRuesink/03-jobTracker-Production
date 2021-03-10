import React from "react";
import { connect } from "react-redux";
import {
  fetchOpportunities,
  fetchActivities,
  fetchContacts,
  fetchMeetings,
} from "../../actions";
import ActivityFeed from "../activities/ActivityFeed";
import OpportunityList from "../opportunities/OpportunityList";
import UserStats from "./UserStats";
import requireAuth from "../requireAuth";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.auth.signedIn) {
      this.props.fetchContacts();
      this.props.fetchMeetings();
    }
  }

  render() {
    return (
      <div>
        <UserStats />
        <div className="ui stackable grid">
          <div className="ten wide column">
            <div>
              <OpportunityList />
            </div>
          </div>
          <div className="six wide column">
            <ActivityFeed />
          </div>
        </div>
      </div>
    );
  }
}

Home = requireAuth(Home);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
  fetchActivities,
  fetchContacts,
  fetchMeetings,
})(Home);
