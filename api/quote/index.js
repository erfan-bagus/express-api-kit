import express from 'express';
import debugLogger from 'debug-logger';
import isEmpty from 'is-empty';
import {
	getQuotes,
	getQuote,
	postQuote,
	putQuote,
	deleteQuote,
} from './operator';

const log = debugLogger('quoteApi');
const router = express.Router();

router.route('/')
	/**
	 * get quotes
	 */
	.get((req, res) => {
		getQuotes()
			.then((quotes) => {
				let message = 'Quotes obtained!';

				if (isEmpty(quotes)) {
					log.warn('response null quote');
					message = 'Quotes is empty!';
				} else {
					log.info('response obtained quotes');
				}

				res.json({ quotes, message });
			})
			.catch((err) => {
				log.warn('response err of obtain quotes');
				res.status(400).json({ err });
			});
	})
	/**
	 * post quote
	 */
	.post((req, res) => {
		postQuote({ data: req.body })
			.then((quote) => {
				log.info('response created quote');
				res.json({ quote, message: 'Quote created!' });
			})
			.catch((err) => {
				log.warn('response err of create quote');
				res.status(400).json({ err });
			});
	});

router.route('/:id')
	/**
	 * get quote
	 */
	.get((req, res) => {
		getQuote({ id: req.params.id })
			.then((quote) => {
				let message = 'Quote obtained!';

				if (isEmpty(quote)) {
					log.warn('response null quote');
					message = 'Quote is empty!';
				} else {
					log.info('response obtained quote');
				}

				res.json({ quote, message });
			})
			.catch((err) => {
				log.warn('response err of obtain quote');
				res.status(400).json({ err });
			});
	})
	/**
	 * put quote
	 */
	.put((req, res) => {
		putQuote({ id: req.params.id, data: req.body })
			.then((quote) => {
				let message = 'Quote updated!';

				if (isEmpty(quote)) {
					log.warn('response null quote');
					message = 'Quote not found!';
				} else {
					log.info('response updated quote');
				}

				res.json({ quote, message });
			})
			.catch((err) => {
				log.warn('response err of update quote');
				res.status(400).json({ err });
			});
	})
	/**
	 * delete quote
	 */
	.delete((req, res) => {
		deleteQuote({ id: req.params.id })
			.then((quote) => {
				let message = 'Quote deleted!';

				if (isEmpty(quote)) {
					log.info('response null quote');
					message = 'Quote not found!';
				} else {
					log.info('response deleted quote');
				}
				res.json({ quote, message });
			})
			.catch((err) => {
				log.warn('response err of delete quote');
				res.status(400).json({ err });
			});
	});

const quoteApi = (app) => { // add quote api
	app.use('/api/quote', router);
};

export default quoteApi;
