/* global require */
import moment from 'moment';
import React from 'react';

/**
 * Gets an array of Date objects at the first of every month, from start to end.
 */
const getMonthDates = (start, end) => {
  const first = moment(start.getTime()).startOf('month').add(1, 'month');
  const current = first;
  const ret = [];
  while (current.isBefore(end)) {
    ret.push(moment(current));
    current.add(1, 'month');
  }
  return ret;
};

const getData = data => {
  const dates = getMonthDates(data[0].date, data[data.length - 1].date);
  let previousDateMileage = null;
  let dateIndex = 0;
  const processedData = data.reduce((acc, dateMileage) => {
    if (!previousDateMileage || dateIndex >= dates.length) {
      previousDateMileage = dateMileage;
      return acc;
    }
    if (dates[dateIndex].isBetween(previousDateMileage.date, dateMileage.date)) {
      const daysIntoPeriod = moment(dates[dateIndex]).diff(previousDateMileage.date, 'days');
      const daysInPeriod = moment(dateMileage.date).diff(previousDateMileage.date, 'days');
      const interpolated = previousDateMileage.mileage + (dateMileage.mileage - previousDateMileage.mileage) * daysIntoPeriod / daysInPeriod;
      acc.push({date: dates[dateIndex++], mileage: interpolated});
    } else if (dates[dateIndex].isSame(dateMileage.date)) {
      acc.push({date: dates[dateIndex++], mileage: dateMileage.mileage});
    }
    previousDateMileage = dateMileage;
    return acc;
  }, []);
  const dataToPlot = [];
  for (let i = 0; i < processedData.length - 1; i++) {
    const mileageDifference = processedData[i + 1].mileage - processedData[i].mileage;
    dataToPlot.push({date: processedData[i].date, mileage: mileageDifference});
  }
  return {
    labels: dataToPlot.map(d => d.date.format('MMM YY')),
    datasets: [{
      label: 'Monthly miles',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      backgroundColor: 'rgba(151,187,205,0.5)',
      data: dataToPlot.map(d => d.mileage),
    }],
  };
};

const chartOptions = {
  responsive: true,
  title: {
    display: true,
    text: 'miles traveled',
  },
  scales: {
    xAxes: [{
      scaleLabel: {display: true, labelString: 'Month/Year'},
    }],
    yAxes: [{
      scaleLabel: {display: true, labelString: 'miles'},
    }],
  },
};

export default class MonthOverMonth extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      date: React.PropTypes.instanceOf(Date).isRequired,
      mileage: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  componentDidMount() {
    require('./monthOverMonth.less');
    this.ChartJs = require('react-chartjs');
    this.forceUpdate();
  }

  render() {
    const ChartJs = this.ChartJs;
    const chart = !ChartJs ? <div/>
      : <ChartJs.Bar data={getData(this.props.data)} options={chartOptions}/>;
    return (
      <div className="Component-MonthOverMonth">
        {chart}
      </div>
    );
  }
}
