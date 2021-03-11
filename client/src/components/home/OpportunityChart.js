import React from "react";

import {
  FlexibleWidthXYPlot,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
  VerticalBarSeries,
} from "react-vis";

class OpportunityChart extends React.Component {
  render() {
    return (
      <FlexibleWidthXYPlot
        margin={{ bottom: 70 }}
        xType="ordinal"
        color="#2185D0"
        height={300}
      >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis />
        <VerticalBarSeries animation data={this.props.data} />
      </FlexibleWidthXYPlot>
    );
  }
}

export default OpportunityChart;
