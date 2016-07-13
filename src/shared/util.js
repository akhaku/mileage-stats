import moment from 'moment';

/**
 * Interpolates two points (objects of {date: Date, mileage: number}) to an object of
 * {date: interpolateTo, mileage: interpolatedMileage}.
 */
const interpolate = (interpolateTo, point1, point2) => {
  const daysIntoPeriod = moment(interpolateTo).diff(point1.date, 'days');
  const daysInPeriod = moment(point2.date).diff(point1.date, 'days');
  const mileage = point1.mileage + (point2.mileage - point1.mileage) * daysIntoPeriod / daysInPeriod;
  return {date: interpolateTo, mileage};
};

const endDate = moment('2017-08-10');
const targetMileage = 36000;

export {
  endDate,
  interpolate,
  targetMileage,
};
