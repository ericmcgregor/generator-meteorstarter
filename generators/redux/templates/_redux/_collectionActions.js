import { registerReactiveSource } from 'meteor-redux-middlewares';
import { startSubscription } from 'meteor-redux-middlewares';
import {<%= collectionName+"All" %>} from "/imports/api/<%= collectionName %>/db/<%= collectionName %>.queries";

export const <%= collectionName.toUpperCase() %>_ALL_SUBSCRIPTION_READY = 'QUERY_GET<%= collectionName.toUpperCase() %>_SUBSCRIPTION_READY';
export const <%= collectionName.toUpperCase() %>_ALL_SUBSCRIPTION_CHANGED = 'QUERY_GET<%= collectionName.toUpperCase() %>_SUBSCRIPTION_CHANGED';
export const <%= collectionName.toUpperCase() %>_SUB = 'query.get<%= collectionVariable %>';

export const load<%= collectionVariable %> = ({filters, options}={}) =>{
    const query = <%= collectionName %>All.clone({
      filters:{ ...(filters || {}) },
      options:{ ...(options || {}) }
    })

    return startSubscription({
        key: <%= collectionName.toUpperCase() %>_SUB,
        get: () => query.fetch(),
        subscribe: () => query.subscribe(),
    });
}


export const <%= collectionName.toUpperCase() %>_DETAIL_SUBSCRIPTION_READY = 'QUERY_GET_<%= collectionVariable.toUpperCase() %>_DETAIL_SUBSCRIPTION_READY';
export const <%= collectionName.toUpperCase() %>_DETAIL_SUBSCRIPTION_CHANGED = 'QUERY_GET_<%= collectionVariable.toUpperCase() %>_DETAIL_SUBSCRIPTION_CHANGED';
export const <%= collectionName.toUpperCase() %>_DETAIL_SUB = 'query.get.<%= collectionVariable %>.Detail';

export const load<%= collectionVariable %>Detail = ({filters, options}={}) =>{
    const query = <%= collectionName %>All.clone({
      filters:{ ...(filters || {}) },
      options:{ ...(options || {}) }
    })

    return startSubscription({
        key: <%= collectionName.toUpperCase() %>_DETAIL_SUB,
        get: () => query.fetchOne(),
        subscribe: () => query.subscribe(),
    });
}

// export const fetchExternalData = ({_id}) =>{
//   return function(dispatch) {
//     dispatch({type:"FETCH_EXTERNAL_DATA",id:_id})
//     Meteor.call('reports.fetchDetails', _id, (err, results)=>{
//       dispatch({
//         type:"SUCCESS_FETCH_EXTERNAL_DATA",
//         id:_id,
//         payload:results
//       })
//     })
//   }
// }
