import express from 'express';
import debugLogger from 'debug-logger';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import isEmpty from 'is-empty';

import { postUser, getUsersBy } from '../user/operator';

import jwtConfig from '../../configs/jwt';

const log = debugLogger('authApi');
const router = express.Router();

router.route('/login')
	.post(async (req, res) => {
		const { username, email, password } = req.body;
		let authType;

		if (!isEmpty(username) && isEmpty(email)) {
			authType = 'username';
		} else if (!isEmpty(email) && isEmpty(username)) {
			authType = 'email';
		}

		const userArr = (authType === 'username') ? await getUsersBy({
			query: { username },
		}) : (authType === 'email') && await getUsersBy({
			query: { email },
		});

		if (!isEmpty(userArr)) {
			const user = userArr.reduce(i => i);

			if (bcrypt.compareSync(password, user.password)) {
				const token = jwt.sign({
					id: user.id,
					username: user.username,
					email: user.email,
				}, jwtConfig.secret, {
					expiresIn: '2 days',
				});

				log.info('response token');
				res.json({ token });
			} else {
				const err = {
					errors: {
						password: { message: 'Wrong password!' },
					},
				};

				log.warn('response err, wrong password');
				res.status(400).json({ err });
			}
		} else {
			const err = { errors: {} };
			err.errors[authType].message = 'User not found!';

			log.warn('response err, user not found');
			res.status(400).json({ err });
		}
	});

router.route('/signup')
	.post((req, res) => {
		if (req.password === req.passConfirm) {
			const data = req.body;

			delete data.passConfirm;

			postUser({ data })
				.then((user) => {
					log.info('response created user');
					res.json({ user, message: 'User created!' });
				})
				.catch((err) => {
					log.warn('response err of create user');
					res.status(400).json({ err });
				});
		} else {
			const err = {
				errors: {
					passConfirm: { message: 'Password is not the same!' },
				},
			};

			log.warn('response err, failed to create user, password is not the same');
			res.status(400).json({ err });
		}
	});

const authApi = (app) => { // add auth api
	app.use('/api/auth', router);
};

export default authApi;
