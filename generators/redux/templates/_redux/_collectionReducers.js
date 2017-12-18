import { STOP_SUBSCRIPTION } from 'meteor-redux-middlewares';

import {
  <%= collectionName.toUpperCase() %>_ALL_SUBSCRIPTION_READY,
  <%= collectionName.toUpperCase() %>_ALL_SUBSCRIPTION_CHANGED,
  <%= collectionName.toUpperCase() %>_SUB,

  <%= collectionName.toUpperCase() %>_DETAIL_SUBSCRIPTION_READY,
  <%= collectionName.toUpperCase() %>_DETAIL_SUBSCRIPTION_CHANGED,
  <%= collectionName.toUpperCase() %>_DETAIL_SUB,
} from '/imports/redux/<%= collectionName %>/<%= collectionName %>Actions';

const initialState = {
  fetching:false,
  ready:false,
  <%= collectionName %>SubscriptionStopped:false,
  <%= collectionName %>:[]
}

export default function reducer(state=initialState, action) {

  switch (action.type) {
    case <%= collectionName.toUpperCase() %>_ALL_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.payload.ready,
      };

    case <%= collectionName.toUpperCase() %>_ALL_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        <%= collectionName %>: action.payload,
      };


    case <%= collectionName.toUpperCase() %>_DETAIL_SUBSCRIPTION_READY:
      return {
        ...state,
        ready: action.payload.ready,
      };

    case <%= collectionName.toUpperCase() %>_DETAIL_SUBSCRIPTION_CHANGED:
      return {
        ...state,
        [action.payload._id]:{
          ...state[action.payload._id],
          ...action.payload
        }
      };

    // case "SUCCESS_FETCH_EXTERNAL_DATA":
    //   return {
    //     ...state,
    //     [action.id]:{
    //       ...(state[action.id]),
    //       externalData:[
    //         ...action.payload
    //       ]
    //     },
    //   };

    case STOP_SUBSCRIPTION:
      // return action.payload === <%= collectionName.toUpperCase() %>_SUB
      //   ? { ...initialState, <%= collectionName %>SubscriptionStopped: true }
      //   : state;

      return state

  }

  return state
}
