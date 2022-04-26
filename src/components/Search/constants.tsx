import moment from 'moment';

export const rentData = [
  {label: '00:00 am - 04:00 am', value: 'firstPart'},
  {label: '04:00 am - 08:00 am', value: 'secondPart'},
  {label: '12:00 am - 04:00 pm', value: 'thirdPart'},
  {label: '04:00 pm - 08:00 pm', value: 'fourthPart'},
  {label: '08:00 am - 12:00 pm', value: 'fifthPart'},
];

export const searchSortArray = [
  {label: 'Price: low to hight', value: 'sortCosts'},
  {label: 'Price: hight to low', value: 'sortCostsDesc'},
  {label: 'Marks: A - Z', value: 'sortMarks'},
  {label: 'Marks: Z - A', value: 'sortMarksDesc'},
];

export const today = moment().toDate();
export const currentYear = moment().get('year').toString();
export const endOfYear = moment(`${currentYear}-12-31`).toDate();
export const formatDate = (date: moment.MomentInput) =>
  moment(date).format('DD / MM / YYYY');
export const formatDateApi = (date: moment.MomentInput) =>
  moment(date).format('YYYYDDMM');
