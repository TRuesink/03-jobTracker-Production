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
import OpportunityChart from "./OpportunityChart";

class Home extends React.Component {
  componentDidMount() {
    if (this.props.auth.signedIn) {
      this.props.fetchContacts();
      this.props.fetchMeetings();
    }
  }

  getOppChartData() {
    const data = {
      research: 0,
      "info meeting": 0,
      "screening interview": 0,
      "technical interview": 0,
      negotiation: 0,
      won: 0,
      lost: 0,
    };
    for (let opp of this.props.opportunities) {
      data[opp.stage] += 1;
    }
    const formattedData = [];
    for (let item in data) {
      formattedData.push({ x: item, y: data[item] });
    }
    return formattedData;
  }

  render() {
    return (
      <div>
        <UserStats />
        <div className="ui stackable grid">
          <div className="ten wide column">
            <div>
              <OpportunityChart data={this.getOppChartData()} />
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
    opportunities: Object.values(state.opportunities.data),
  };
};

export default connect(mapStateToProps, {
  fetchOpportunities,
  fetchActivities,
  fetchContacts,
  fetchMeetings,
})(Home);
