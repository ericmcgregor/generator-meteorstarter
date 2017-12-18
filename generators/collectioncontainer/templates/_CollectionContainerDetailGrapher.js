import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {<%= collectionName+"All" %>} from "../../../../api/<%= collectionName %>/db/<%= collectionName %>.queries";
import {withQuery} from 'meteor/cultofcoders:grapher-react';
import {Table} from "reactstrap";



class <%= containerName %>Component extends Component {
  render() {
    if (this.props.isLoading) {
        return <div>Loading</div>
    }

    if (this.props.error) {
        return <div>{this.props.error.reason}</div>
    }
    console.log(this.props)
    return (
      <div></div>

    );
  }
}

<%= containerName %>Component.propTypes = {};
<%= containerName %>Component.defaultProps = {};

const <%= containerName %> = withQuery((props) => {
  return <%= collectionName %>All.clone({
    filters:{
      _id:props.match.params.<%= collectionNameSingle %>Id
    },
    options:{}
  });
}, {reactive:true, single:true})(<%= containerName %>Component)

export default <%= containerName %>
