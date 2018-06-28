import debugLogger from 'debug-logger';
import validator from 'validator';
import isEmpty from 'is-empty';
import QuoteModel from '../../models/quote';
import sanitizer from './sanitizer';

const log = debugLogger('quoteOperator');
const quoteItem = ['content', 'inventor'];

export const getQuotes = () => new Promise((resolve, reject) => {
	QuoteModel.find().exec((err, quote) => {
		if (err) {
			log.warn('return err, failed to obtain quotes');
			reject(err);
		} else {
			if (isEmpty(quote)) {
				log.warn('return null quote');
			} else {
				log.info('return obtained quotes');
			}
			resolve(quote);
		}
	});
});

export const getQuote = ({ id }) => new Promise((resolve, reject) => {
	if (validator.isMongoId(id)) {
		QuoteModel.findById(id, (err, quote) => {
			if (err) {
				log.warn('return err, failed to obtain quote');
				reject(err);
			} else {
				if (isEmpty(quote)) {
					log.warn('return null quote');
				} else {
					log.info('return obtained quote');
				}
				resolve(quote);
			}
		});
	} else {
		const err = { message: 'Quote id is not valid!' };
		log.warn('return err, failed to obtain quote, not valid id');
		reject(err);
	}
});

export const postQuote = ({ data }) => new Promise((resolve, reject) => {
	const quote = new QuoteModel({ // create quote
		content: sanitizer.content(data.content),
		inventor: sanitizer.inventor(data.inventor),
	});

	quote.save((err) => {
		if (err) {
			log.warn('return err, failed to create quote');
			reject(err);
		} else {
			log.info('return created quote');
			resolve(quote);
		}
	});
});

export const putQuote = ({ id, data }) => new Promise((resolve, reject) => {
	if (validator.isMongoId(id)) {
		const update = {};

		if (!isEmpty(data.content)) {
			update.content = sanitizer.content(data.content);
		}

		if (!isEmpty(data.inventor)) {
			update.inventor = sanitizer.inventor(data.inventor);
		}

		QuoteModel.findByIdAndUpdate(id, update, {
			new: true,
			runValidators: true,
		}, (err, quote) => {
			if (err) {
				log.warn('return err, failed to update quote');
				reject(err);
			} else {
				if (isEmpty(quote)) {
					log.warn('return null quote');
				} else {
					log.info('return updated quote');
				}
				resolve(quote);
			}
		});
	} else {
		const err = { message: 'Quote id is not valid!' };
		log.warn('return err, failed to update quote, not valid id');
		reject(err);
	}
});

export const deleteQuote = ({ id }) => new Promise((resolve, reject) => {
	if (validator.isMongoId(id)) {
		QuoteModel.findByIdAndRemove(id, (err, quote) => {
			if (err) {
				log.warn('return err, failed to delete quote');
				reject(err);
			} else {
				if (isEmpty(quote)) {
					log.warn('return null quote');
				} else {
					log.info('return deleted quote');
				}
				resolve(quote);
			}
		});
	} else {
		const err = { message: 'Quote id is not valid!' };
		log.warn('return err, failed to delete quote, not valid id');
		reject(err);
	}
});
