import {<%= collectionVariable %>} from "../<%= collectionName %>";
import Meteor from 'meteor/meteor'

<%= collectionVariable %>.addLinks({
    // 'link': {
    //     type: 'one',
    //     collection: 'links',
    //     field: 'linkId',
    //     index: true,
    //     autoremove: true,
    //     denormalize: {
    //         body: {
    //             title: 1,
    //         },
    //         field: 'linkCache',
    //     }
    // }
})
