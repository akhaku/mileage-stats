/* eslint-env browser,node */
import React from 'react';

const timeFormat = 'MM/DD/YYYY';

const chartOptions = {
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

const getData = data => {
  return {
    labels: data.map(d => d.date),
    datasets: [{
      label: 'Overall miles traveled',
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,1)',
      data: data.map(d => ({x: d.date, y: d.mileage})),
    }],
  };
};

export default class OverallMiles extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      date: React.PropTypes.instanceOf(Date).isRequired,
      mileage: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  componentDidMount() {
    this.ChartJs = require('react-chartjs');
    this.forceUpdate();
  }

  render() {
    const ChartJs = this.ChartJs;
    return <ChartJs.Line data={getData(this.props.data)} options={chartOptions}/>;
  }
}
