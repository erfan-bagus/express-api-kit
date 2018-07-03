import debugLogger from 'debug-logger';
import validator from 'validator';
import isEmpty from 'is-empty';
import UserModel from '../../models/user';
import sanitizer from './sanitizer';

const log = debugLogger('userOperator');

const userItem = ['username', 'password', 'email'];

export const getUsers = () => new Promise((resolve, reject) => {
	UserModel.find().exec((err, user) => {
		if (err) {
			log.warn('return err, failed to obtain users');
			reject(err);
		} else {
			if (isEmpty(user)) {
				log.warn('return null user');
			} else {
				log.info('return obtained users');
			}
			resolve(user);
		}
	});
});

export const getUser = ({ id }) => new Promise((resolve, reject) => {
	if (validator.isMongoId(id)) {
		UserModel.findById(id, (err, user) => {
			if (err) {
				log.warn('return err, failed to obtain user');
				reject(err);
			} else {
				if (isEmpty(user)) {
					log.warn('return null user');
				} else {
					log.info('return obtained user');
				}
				resolve(user);
			}
		});
	} else {
		const err = { message: 'User id is not valid!' };
		log.warn('return err, failed to obtain user, not valid id');
		reject(err);
	}
});

export const postUser = ({ data }) => new Promise((resolve, reject) => {
	const d = {};

	userItem.forEach((item) => {
		d[item] = sanitizer[item](data[item]);
	});

	const user = new UserModel(d);

	user.save((err, u) => {
		if (err) {
			log.warn('return err, failed to create user', err);
			reject(err);
		} else {
			log.info('return created user');
			resolve(u);
		}
	});
});

export const putUser = ({ id, data }) => new Promise((resolve, reject) => {
	if (validator.isMongoId(id)) {
		UserModel.findByIdAndUpdate(id, {
			new: true,
			runValidators: true,
		}, (err, u) => {
			if (err) {
				log.warn('return err, failed to update user');
				reject(err);
			} else {
				const user = u;

				userItem.forEach((item) => {
					if (!isEmpty(data[item])) user[item] = sanitizer[item](data[item]);
				});

				user.save((err, u) => {
					if (err) {
						if (err) {
							log.warn('return err, failed to update user');
							reject(err);
						}
					} else {
						if (isEmpty(u)) {
							log.warn('return null user');
						} else {
							log.info('return updated user');
						}
						resolve(u);
					}
				});
			}
		});
	} else {
		const err = { message: 'User id is not valid!' };
		log.warn('return err, failed to update user, not valid id');
		reject(err);
	}
});

export const deleteUser = ({ id }) => new Promise((resolve, reject) => {
	if (validator.isMongoId(id)) {
		UserModel.findByIdAndRemove(id, (err, user) => {
			if (err) {
				log.warn('return err, failed to delete user');
				reject(err);
			} else {
				if (isEmpty(user)) {
					log.warn('return null user');
				} else {
					log.info('return deleted user');
				}
				resolve(user);
			}
		});
	} else {
		const err = { message: 'User id is not valid!' };
		log.warn('return err, failed to delete user, not valid id');
		reject(err);
	}
});
