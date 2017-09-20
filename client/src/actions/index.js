import axios from 'axios';

export const CREATE_POSTS = 'CREATE_POSTS';

const Root_URL = 'http://rest.learn.code.academy/api/aj';

export function createPost(props){
	//ROOT_URL 
	const request = axios.post(`${Root_URL}/posts`, props);
	return{
		type: CREATE_POSTS,
		payload: request
	};
}
