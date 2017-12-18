// Definition of the links collection

import { Mongo } from 'meteor/mongo';

export const <%= collectionVariable %> = new Mongo.Collection('<%= collectionName %>');
