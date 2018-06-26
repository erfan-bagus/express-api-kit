import validator from 'validator';
import debugLogger from 'debug-logger';

const log = debugLogger('removePunctuation');

const removePunctuation = (word) => {
	const punctuation = [' ', '.', ',', ';', ':', '?', '!', '.', "'", '"', '(', ')', '/', '[', '-']; // dash character must be the last element
	const closedBracket = ']'; // closed bracket not supported by validator.js blacklist

	log.info('return word without puctuation');
	return validator.blacklist(word.replace(closedBracket, ''), punctuation);
};

export const removePassChar = (pass) => { // not allowed to use space and backslash
	const punctuation = [
		'!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '.', '/', ':',
		';', '<', '=', '>', '?', '@', '[', '^', '_', '`', '{', '|', '}', '~', '-',
	]; // dash character must be the last element
	const closedBracket = ']'; // closed bracket not supported by validator.js blacklist

	log.info('return pass without puctuation');
	return validator.blacklist(pass.replace(closedBracket, ''), punctuation);
};

export default removePunctuation;
