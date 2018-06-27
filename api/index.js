import quote from './quote';
import user from './user';

const api = (app) => { // add all api
	quote(app);
	user(app);
};

export default api;
