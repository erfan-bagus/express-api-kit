import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import debugLogger from 'debug-logger';

const log = debugLogger('quoteModel');

const removePunctuation = (item) => {
	const punctuation = [' ', '.', ',', ';', ':', '?', '!', '.', "'", '"', '(', ')', '/', '[', '-']; // dash character must be the last element
	const closedBracket = ']'; // closed bracket not supported by validator.js blacklist

	return validator.blacklist(item.replace(closedBracket, ''), punctuation);
};

const quoteSchema = new Schema(
	{
		content: {
			type: String,
			required: [true, 'Can not be empty!'],
			validate: [
				{
					validator: (v) => {
						let item = v;
						item = removePunctuation(item);
						const isValid = validator.isAlphanumeric(item);

						log.info(`return content validation result, ${isValid}`);
						return isValid;
					},
					message: 'Must only use letters, numbers, spaces, and punctuation!',
				},
				{
					validator: (v) => {
						const isValid = validator.isLength(v, { min: 10, max: 100 });

						log.info(`return content validation length result, ${isValid}`);
						return isValid;
					},
					message: 'Must be between 10 and 100 characters!',
				},
			],
		},
		inventor: {
			type: String,
			required: [true, 'Can not be empty!'],
			validate: [
				{
					validator: (v) => {
						let item = v;
						item = removePunctuation(item);
						const isValid = validator.isAlphanumeric(item);

						log.info(`return inventor validation result, ${isValid}`);
						return isValid;
					},
					message: 'Must only use letters, numbers, spaces, and punctuation!',
				},
				{
					validator: (v) => {
						const isValid = validator.isLength(v, { min: 5, max: 30 });

						log.info(`return content validation length result, ${isValid}`);
						return isValid;
					},
					message: 'Must be between 5 and 20 characters!',
				},
			],
		},
	},
	{
		timestamps: false,
		toJSON: { virtuals: false },
	},
);

const QuoteModel = mongoose.model('Quote', quoteSchema);

export default QuoteModel;
