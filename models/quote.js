import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import mongooseId from 'mongoose-id';
import debugLogger from 'debug-logger';

import removePunctuation from '../libs/remove-punctuation';

const log = debugLogger('quoteModel');

export const quoteRules = {
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
				message: 'Must only use letters, numbers, spaces, or punctuation!',
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
				message: 'Must only use letters, numbers, spaces, or punctuation!',
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
};

const quoteSchema = new Schema(quoteRules, {
	timestamps: false,
	toJSON: { virtuals: false },
});

quoteSchema.plugin(mongooseId);

const QuoteModel = mongoose.model('Quote', quoteSchema);

export default QuoteModel;
