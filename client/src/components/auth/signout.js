import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Signout extends Component {
	comonentWillMount(){
		this.props.signoutUser();
	}
	render() {
		return <div>Good Bye! </div>;
	}
}

export default connect(null, actions)(Signout);