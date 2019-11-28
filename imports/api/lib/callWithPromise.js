/**
  * @fileOverview Contains generic function to call Meteor methods with Promise
*/
import { Meteor } from 'meteor/meteor';

export default function callWithPromise (method, ...args) {
  return new Promise((resolve, reject) => {
    Meteor.apply(method, args, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
}
