import {<%= collectionVariable %>} from "../<%= collectionName %>";

export const <%= collectionName %>All = <%= collectionVariable %>.createQuery('get<%= collectionVariable %>', {
    title: 1,
    description:1,
    createdAt:1,
});
