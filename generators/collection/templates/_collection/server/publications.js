// All links-related publications

import { Meteor } from 'meteor/meteor';
import { <%= collectionVariable %> } from '../<%= collectionName %>.js';


Meteor.publish('<%= collectionName %>.all', function (query={}, search) {
  if (search) {
      let regex = new RegExp(search, 'i');
      query = {
          ...query,
          $or: [{
            name: regex
          }, ]
      }
    }
  return <%= collectionVariable %>.find(query, {});
});
