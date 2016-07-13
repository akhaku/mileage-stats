/* eslint-env browser,node */
import React from 'react';

import MonthOverMonth from 'app/shared/components/monthOverMonth';
import Numbers from 'app/shared/components/numbers';
import OverallMiles from 'app/shared/components/overallMiles';

export default class Home extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      date: React.PropTypes.instanceOf(Date).isRequired,
      mileage: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  componentDidMount() {
    require('./home.less');
  }

  render() {
    return (
      <div className="Component-Home">
        <Numbers data={this.props.data}/>
        <MonthOverMonth data={this.props.data}/>
        <OverallMiles data={this.props.data}/>
      </div>
    );
  }
}
