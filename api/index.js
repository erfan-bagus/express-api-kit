import auth from './auth';
import quote from './quote';
import user from './user';

const api = (app) => { // add all api
	auth(app);
	quote(app);
	user(app);
};

export default api;
