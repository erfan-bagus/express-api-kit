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
	const d = {};

	quoteItem.forEach((item) => {
		d[item] = sanitizer[item](data[item]);
	});

	const quote = new QuoteModel(d);

	quote.save((err, q) => {
		if (err) {
			log.warn('return err, failed to create quote');
			reject(err);
		} else {
			log.info('return created quote');
			resolve(q);
		}
	});
});

export const putQuote = ({ id, data }) => new Promise((resolve, reject) => {
	if (validator.isMongoId(id)) {
		QuoteModel.findByIdAndUpdate(id, {
			new: true,
			runValidators: true,
		}, (err, q) => {
			if (err) {
				log.warn('return err, failed to update quote');
				reject(err);
			} else {
				const quote = q;

				quoteItem.forEach((item) => {
					if (!isEmpty(data[item])) quote[item] = sanitizer[item](data[item]);
				});

				quote.save((err, q) => {
					if (err) {
						log.warn('return err, failed to update quote');
						reject(err);
					} else {
						if (isEmpty(q)) {
							log.warn('return null quote');
						} else {
							log.info('return updated quote');
						}
						resolve(q);
					}
				});
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
