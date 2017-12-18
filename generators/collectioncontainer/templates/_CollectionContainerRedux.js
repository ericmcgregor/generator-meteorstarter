import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {<%= "load"+collectionVariable %>, <%= collectionVariable.toUpperCase()+"_SUB" %>} from "../../../../redux/<%= collectionName %>/<%= collectionName %>Actions";
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
    return (
      <div>
      <Table striped>
        <tbody>
        {
            this.props.<%= collectionName %>.map((item, i)=>{
              return (
                <tr key={i}>
                  <td></td>
                </tr>
              )
            })
        }
        </tbody>
      </Table>
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
    dispatch(load<%= collectionVariable %>({
      filters:{},
      options:{}
    }))
  },
  stopPostSubscription: () => {
    dispatch(stopSubscription(<%= collectionVariable.toUpperCase() %>_SUB))
  },
});

const <%= containerName %> = connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= containerName %>Component);

export default <%= containerName %>
