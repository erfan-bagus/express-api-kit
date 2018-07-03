import validator from 'validator';
import debugLogger from 'debug-logger';
import isEmpty from 'is-empty';

const log = debugLogger('removePunctuation');

const removePunctuation = (word) => {
	if (isEmpty(word)) return word;

	const punctuation = [' ', '.', ',', ';', ':', '?', '!', '.', "'", '"', '(', ')', '/', '[', '-']; // dash character must be the last element
	const closedBracket = ']'; // closed bracket not supported by validator.js blacklist

	log.info('return word without punctuation');
	return validator.blacklist(word.replace(closedBracket, ''), punctuation);
};

export const removePassChar = (pass) => { // not allowed to use space and backslash
	if (isEmpty(pass)) return pass;

	const punctuation = [
		'!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '.', '/', ':',
		';', '<', '=', '>', '?', '@', '[', '^', '_', '`', '{', '|', '}', '~', '-',
	]; // dash character must be the last element
	const closedBracket = ']'; // closed bracket not supported by validator.js blacklist

	log.info('return pass without punctuation');
	return validator.blacklist(pass.replace(closedBracket, ''), punctuation);
};

export default removePunctuation;
