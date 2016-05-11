/* eslint-env browser,node */
import React from 'react';

export default class Home extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      date: React.PropTypes.instanceOf(Date).isRequired,
      mileage: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  componentDidMount() {
    require('./Home.less');
  }

  _renderDates(data) {
    return data.map(d => <p key={d.date.getTime()}>{d.date + ' ' + d.mileage}</p>);
  }

  render() {
    return (
      <div className="Component-Home">
        {'Hello World'}
        {this._renderDates(this.props.data)}
      </div>
    );
  }
}
