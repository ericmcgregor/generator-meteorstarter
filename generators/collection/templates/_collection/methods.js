// Methods related to links

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { <%= collectionVariable %> } from './<%= collectionName %>.js';
import { <%= collectionName+"All" %> } from './db/<%= collectionName %>.queries'

Meteor.methods({
  '<%= collectionName %>.insert'({title}) {
    check(title, String);

    let _id = <%= collectionVariable %>.insert({
      title:'testing link',
      createdAt: new Date(),
      description:"test description"
    });

  },
  '<%= collectionName %>.remove'({_id}) {
    check(_id, String);

    return <%= collectionVariable %>.remove(_id);
  },
  '<%= collectionName %>.reset'() {
    return <%= collectionVariable %>.remove({});
  },
  <%= collectionName %>QueryGetAll() {
      const query = <%= collectionName+"All" %>.clone()
      return query.fetch();
  }
});
