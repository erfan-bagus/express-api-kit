import validator from 'validator';
import debugLogger from 'debug-logger';
import isEmpty from 'is-empty';
// import Case from 'case';

const log = debugLogger('quoteSanitizer');

const quoteSanitizer = {
	content: (unsanitized) => {
		let item = unsanitized;

		if (isEmpty(item)) return undefined;

		item = validator.ltrim(item, [' ', '.']); // remove space and dot on the left
		item = validator.rtrim(item, [' ', '.']); // remove space and dot on the right
		item += '.'; // last charater is dot
		item = item.charAt(0).toUpperCase() + item.slice(1); // change fist character to uppercase

		log.info('return sanitized content');
		return item;
	},
	inventor: (unsanitized) => {
		let item = unsanitized;

		if (isEmpty(item)) return undefined;

		item = validator.ltrim(item, [' ', '.']); // remove space and dot on the left
		item = validator.rtrim(item, [' ', '.']); // remove space and dot on the right
		item = item.charAt(0).toUpperCase() + item.slice(1); // change fist character to uppercase

		log.info('return sanitized inventor');
		return item;
	}
};

export default quoteSanitizer;
