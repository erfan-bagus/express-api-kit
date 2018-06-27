// import validator from 'validator';
import debugLogger from 'debug-logger';
import isEmpty from 'is-empty';
// import Case from 'case';

const log = debugLogger('userSanitizer');

const userSanitizer = {
	username: (unsanitized) => {
		const item = unsanitized;

		if (isEmpty(item)) return undefined;

		log.info('return sanitized username');
		return item;
	},
	email: (unsanitized) => {
		const item = unsanitized;

		if (isEmpty(item)) return undefined;

		log.info('return sanitized email');
		return item;
	},
	password: (unsanitized) => {
		const item = unsanitized;

		if (isEmpty(item)) return undefined;

		log.info('return sanitized password');
		return item;
	},
};

export default userSanitizer;
