import express from 'express';
import mongoose from 'mongoose';
import Log from 'debug-logger';

// Express App
const app = express();

// Debug
const log = Log('app');

// Root
app.get('/', (req, res) => {
	log.info('GET /');

	res.status(404).send("Sorry can't find that!");
});

// Listening
const MODE = process.env.NODE_ENV;
const PORT = 8000;

app.listen(PORT, (err) => {
	log.info('MODE:', MODE);
	log.info('PORT:', PORT);

	if(err) {
		log.error('Express server failed to listen!');
		throw err;
	} else {
		log.info('Express server listens!');
	}
});
