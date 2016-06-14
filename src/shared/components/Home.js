/* eslint-env browser,node */
import React from 'react';

import OverallMiles from 'app/shared/components/overallMiles';

export default class Home extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      date: React.PropTypes.instanceOf(Date).isRequired,
      mileage: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  render() {
    return (
      <div className="Component-Home">
        <OverallMiles data={this.props.data}/>
      </div>
    );
  }
}
