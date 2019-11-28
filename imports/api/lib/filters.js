/* eslint-disable arrow-body-style */
import _ from 'lodash';
import { formatIfDate } from './format';

export const filterRows = (filter, value, rows) => {
  return filter && value
    ? _.filter(rows, (row) => {
      const filterSubsrtings = _.without(_.split(_.replace(value.toString().toLowerCase(), /\//g, ' '), ' '), '');
      const filteredString = formatIfDate(row[filter]).toLowerCase();

      if (filterSubsrtings.length === 1) {
        return _.includes(filteredString, filterSubsrtings.find((x) => x !== undefined));
      }

      return filterSubsrtings.reduce((prev, current) => {
        return prev && _.includes(filteredString, current);
      });
    })
    : rows;
};

export const filterByAuthor = (value, rows, authors) => {
  const [ author ] = filterRows('name', value, authors);

  return value && author
    ? _.filter(rows, (row) => row.authorId === author.id)
    : rows;
};

export default filterRows;
