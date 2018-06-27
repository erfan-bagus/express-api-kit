import express from 'express';
import debugLogger from 'debug-logger';
import isEmpty from 'is-empty';
import {
	getUsers,
	getUser,
	postUser,
	putUser,
	deleteUser,
} from './operator';

const log = debugLogger('userApi');
const router = express.Router();

router.route('/')
	/**
	 * get users
	 */
	.get((req, res) => {
		getUsers()
			.then((users) => {
				let message = 'Users obtained!';

				if (isEmpty(users)) {
					log.warn('response null user');
					message = 'Users is empty!';
				} else {
					log.info('response obtained users');
				}

				res.json({ users, message });
			})
			.catch((err) => {
				log.warn('response err of obtain users');
				res.status(400).json({ err });
			});
	})
	/**
	 * post user
	 */
	.post((req, res) => {
		postUser({ data: req.body })
			.then((user) => {
				log.info('response created user');
				res.json({ user, message: 'User created!' });
			})
			.catch((err) => {
				log.warn('response err of create user');
				res.status(400).json({ err });
			});
	});

router.route('/:id')
	/**
	 * get user
	 */
	.get((req, res) => {
		getUser({ id: req.params.id })
			.then((user) => {
				let message = 'User obtained!';

				if (isEmpty(user)) {
					log.warn('response null user');
					message = 'User is empty!';
				} else {
					log.info('response obtained user');
				}

				res.json({ user, message });
			})
			.catch((err) => {
				log.warn('response err of obtain user');
				res.status(400).json({ err });
			});
	})
	/**
	 * put user
	 */
	.put((req, res) => {
		putUser({ id: req.params.id, data: req.body })
			.then((user) => {
				let message = 'User updated!';

				if (isEmpty(user)) {
					log.warn('response null user');
					message = 'User not found!';
				} else {
					log.info('response updated user');
				}

				res.json({ user, message });
			})
			.catch((err) => {
				log.warn('response err of update user');
				res.status(400).json({ err });
			});
	})
	/**
	 * delete user
	 */
	.delete((req, res) => {
		deleteUser({ id: req.params.id })
			.then((user) => {
				let message = 'User deleted!';

				if (isEmpty(user)) {
					log.info('response null user');
					message = 'User not found!';
				} else {
					log.info('response deleted user');
				}
				res.json({ user, message });
			})
			.catch((err) => {
				log.warn('response err of delete user');
				res.status(400).json({ err });
			});
	});

const userApi = (app) => { // add user api
	app.use('/api/user', router);
};

export default userApi;
