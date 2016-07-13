/* global require */
import moment from 'moment';
import React from 'react';

import {endDate, interpolate, targetMileage} from 'app/shared/util';

const getMileageNinetyDaysAgo = data => {
  const lastReading = data[data.length - 1];
  const ninetyDaysAgo = moment(lastReading.date).subtract(90, 'days');
  let previous = lastReading;
  for (let i = data.length - 2; i >= 0; i--) {
    const current = data[i];
    if (ninetyDaysAgo.isBetween(current.date, previous.date)) {
      return interpolate(ninetyDaysAgo, current, previous);
    } else if (ninetyDaysAgo.isSame(current.date)) {
      return {date: ninetyDaysAgo, mileage: current.mileage};
    }
    previous = current;
  }
  return null;
};

const getExtrapolated = (data, lastNinetyDaysMileage) => {
  const numDays = endDate.diff(data[data.length - 1].date, 'days');
  return data[data.length - 1].mileage + lastNinetyDaysMileage / 90 * numDays;
};

const getMileageOver = extrapolated => {
  return <p className="Text-Overage Over">{`${extrapolated - targetMileage} miles over`}</p>;
};

const getMileageUnder = extrapolated => {
  return <p className="Text-Overage Under">{`${targetMileage - extrapolated} miles under`}</p>;
};

export default class Numbers extends React.Component {
  static propTypes = {
    data: React.PropTypes.arrayOf(React.PropTypes.shape({
      date: React.PropTypes.instanceOf(Date).isRequired,
      mileage: React.PropTypes.number.isRequired,
    })).isRequired,
  };

  componentDidMount() {
    require('./numbers.less');
  }

  render() {
    const {data} = this.props;
    const ninetyDayMileage = data[data.length - 1].mileage - getMileageNinetyDaysAgo(data).mileage;
    const extrapolated = getExtrapolated(data, ninetyDayMileage);
    return (
      <div className="Component-Numbers">
        <p>{`90-day monthly average: ${ninetyDayMileage / 3}`}</p>
        <p>
          {`Extrapolated (using 90-day average): ${(extrapolated / 1000).toFixed(2)}k`}
        </p>
        {extrapolated > targetMileage ? getMileageOver(extrapolated.toFixed(0)) : getMileageUnder(extrapolated.ToFixed(0))}
      </div>
    );
  }
}
