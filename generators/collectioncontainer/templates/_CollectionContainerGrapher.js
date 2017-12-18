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

    return (
      <Table striped>
        <tbody>
        {
            this.props.data.map((item, i)=>{
              return (
                <tr key={i}>
                  <td></td>
                </tr>
              )
            })
        }
        </tbody>
      </Table>

    );
  }
}

<%= containerName %>Component.propTypes = {};
<%= containerName %>Component.defaultProps = {};

const <%= containerName %> = withQuery((props) => {
  return <%= collectionName %>All.clone({
    filters:{},
    options:{}
  });
})(<%= containerName %>Component)

export default <%= containerName %>
