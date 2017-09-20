import axios from 'axios';

// 

// const ROOT_URL = 'http://rest.learn.code.academy/api/aj';

const ROOT_URL = 'http://localhost:3000';
export const CREATE_POSTS = 'CREATE_POSTS';

export function createPost(props){

	const request = axios.post(`${Root_URL}/posts`, props);
	return{
		type: CREATE_POSTS,
		payload: request
	};
}

export function signinUser ({email, password}){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {email, password})
			.then(response =>{
				browserHistory.push('/newitem');
			})
				.catch(() => {

				});
	}
}