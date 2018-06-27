import mongoose, { Schema } from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import mongooseId from 'mongoose-id';
import debugLogger from 'debug-logger';

import { removePassChar } from '../libs/remove-punctuation';

const log = debugLogger('userModel');

const userSchema = new Schema(
	{
		username: {
			type: String,
			required: [true, 'Can not be empty!'],
			unique: true,
			uniqueCaseInsensitive: true,
			validate: [
				{
					validator: (v) => {
						const isValid = validator.isAlphanumeric(v);

						log.info(`return username validation result, ${isValid}`);
						return isValid;
					},
					message: 'Must only use letters and numbers!',
				},
				{
					validator: (v) => {
						const isValid = validator.isLength(v, { min: 5, max: 15 });

						log.info(`return username validation length result, ${isValid}`);
						return isValid;
					},
					message: 'Must be between 5 and 15 characters!',
				},
			],
		},
		email: {
			type: String,
			required: [true, 'Can not be empty!'],
			unique: true,
			uniqueCaseInsensitive: true,
			validate: [
				{
					validator: (v) => {
						const isValid = validator.isEmail(v);

						log.info(`return email validation result, ${isValid}`);
						return isValid;
					},
					message: 'Email is invalid!',
				},
			],
		},
		password: {
			type: String,
			required: [true, 'Can not be empty!'],
			validate: [
				{
					validator: (v) => {
						let item = v;
						item = removePassChar(item);
						const isValid = validator.isAlphanumeric(item);

						log.info(`return password validation result, ${isValid}`);
						return isValid;
					},
					message: 'Must only use letters, numbers and password special characters by owasp except space and backslash!',
				},
				{
					validator: (v) => {
						const isValid = validator.isLength(v, { min: 8, max: 20 });

						log.info(`return username validation length result, ${isValid}`);
						return isValid;
					},
					message: 'Must be between 8 and 20 characters!',
				},
			],
		},
	},
	{
		timestamps: false,
		toJSON: { virtuals: false },
	},
);

userSchema.plugin(mongooseId);
userSchema.plugin(uniqueValidator, {
	message: 'Already used by others!',
});

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
