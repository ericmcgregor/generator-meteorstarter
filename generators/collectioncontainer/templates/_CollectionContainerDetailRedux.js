import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {<%= "load"+collectionVariable %>Detail, <%= collectionVariable.toUpperCase()+"_DETAIL_SUB" %>} from "../../../../redux/<%= collectionName %>/<%= collectionName %>Actions";
import {stopSubscription} from "meteor-redux-middlewares";
import {Table} from "reactstrap";


class <%= containerName %>Component extends Component {
  componentDidMount() {
    this.props.loadPosts();
  }
  componentWillUnmount() {
    this.props.stopPostSubscription();
  }

  render() {
    if(!this.props.ready) return null;
    const <%= collectionNameSingle %>Id = this.props.match.params.<%= collectionNameSingle %>Id;
    const <%= collectionNameSingle %> = this.props[<%= collectionNameSingle %>Id]
    if(!<%= collectionNameSingle %>) return null;
    return (
      <div>
      
      </div>
    );
  }
}

<%= containerName %>Component.propTypes = {};
<%= containerName %>Component.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.<%= collectionName %>,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadPosts: () => {
    dispatch(load<%= collectionVariable %>Detail({
      filters:{
        _id:ownProps.match.params.<%= collectionNameSingle %>Id
      },
      options:{}
    }))
  },
  stopPostSubscription: () => {
    dispatch(stopSubscription(<%= collectionVariable.toUpperCase() %>_DETAIL_SUB))
  },
});

const <%= containerName %> = connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= containerName %>Component);

export default <%= containerName %>
