/* eslint-env browser,node */
import React from 'react';

const timeFormat = 'MM/DD/YYYY';

export default class Home extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      date: React.PropTypes.instanceOf(Date).isRequired,
      mileage: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  componentDidMount() {
    require('./Home.less');
    this.ChartJs = require('react-chartjs');
    this.forceUpdate();
  }

  _renderDates(data) {
    return data.map(d => <p key={d.date.getTime()}>{d.date + ' ' + d.mileage}</p>);
  }

  _formatData(data) {
    return data.map(d => ({x: d.date, y: d.mileage}));
  }

  _getData(data) {
    const labels = data.map(d => d.date);
    return {
      labels: labels,
      datasets: [{
        label: 'Overall miles traveled',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: this._formatData(data),
      }],
    };
  }

  _getOptions() {
    return {
      responsive: true,
      title: {
        display: true,
        text: 'miles traveled',
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {format: timeFormat, tooltipFormat: 'll'},
          scaleLabel: {display: true, labelString: 'Date'},
        }],
        yAxes: [{
          scaleLabel: {display: true, labelString: 'miles'},
        }],
      },
    };
  }

  render() {
    const ChartJs = this.ChartJs;
    return (typeof ChartJs === 'undefined') ? <div/> : (
      <div className="Component-Home">
        {'Hello World'}
        <ChartJs.Line data={this._getData(this.props.data)} options={this._getOptions()}/>
      </div>
    );
  }
}
