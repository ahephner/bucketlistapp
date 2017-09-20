// import React, { Component } from 'react';
// import {reduxForm} from 'redux-form';

// class Signin extends Component{
// 	handleFormSubmit({email, password}){
// 		console.log(email, password);
// 	}
// 			render(){
// 				//connect the fields in the reduxForm helper method and connect them to form fields
// 				const { handleSubmit, fields: {email, password}}=this.props;
// 				return(          //passing handleSubmit callback because we're handling a callback functionneed to bind
// 					<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
// 						<fieldset className="form-group">
// 							<label>Email:</label>
// 							<input {...email} className="form-control"/>
// 						</fieldset>
// 						<fieldset className="form-group">
// 							<label>Password:</label>
// 							<input {...password} className="form-control"/>
// 						</fieldset>
// 					   <button action="submit" className="btn btn-primary">Sign in</button>
// 					</form> 

// 					);
// 			}
// }

// export default reduxForm({
// 	form: 'signin',
// 	fields: ['email', 'password']
// })(Signin);

import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit({email, password}){
		console.log(email, password);
//need to do something to log user in
		this.props.signinUser({email, password});
	}
		render() {
			const {handleSubmit, fields: {email, password}}=this.props;
			return(
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

					<fieldset className="form-group">
						<label> Email: </label>
						<input {...email}className="form-control"/>
					</fieldset>
					<fieldset className="form-group">
						<label>Password:</label>
						<input {...password} className="form-control" />
					</fieldset>
				<button action="submit" className="btn btn-primary">Sign In</button>
			    </form>		
			
				);

		}
}

export default reduxForm({
	form: 'signin', 
	fields:['email', 'password']
}, null, actions)(Signin);