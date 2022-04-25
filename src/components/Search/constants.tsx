import moment from 'moment';

export const rentData = [
  {label: '00:00 am - 04:00 am', value: 'firstPart'},
  {label: '04:00 am - 08:00 am', value: 'secondPart'},
  {label: '12:00 am - 04:00 pm', value: 'thirdPart'},
  {label: '04:00 pm - 08:00 pm', value: 'fourthPart'},
  {label: '08:00 am - 12:00 pm', value: 'fifthPart'},
];

export const searchSortArray = [
  {name: 'Price: low to hight', link: '?_sort=cost'},
  {name: 'Price: hight to low', link: '?_sort=mark_order=desc'},
  {name: 'Marks: A - Z', link: '?_sort=mark'},
  {name: 'Marks: Z - A', link: '?_sort=mark&_order=desc'},
];

export const today = moment().toDate();
export const currentYear = moment().get('year').toString();
export const endOfYear = moment(`${currentYear}-12-31`).toDate();
export const formatDate = (date: moment.MomentInput) =>
  moment(date).format('DD / MM / YYYY');
export const formatDateApi = (date: moment.MomentInput) =>
  moment(date).format('YYYYDDMM');
