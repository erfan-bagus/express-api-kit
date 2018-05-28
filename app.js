import express from 'express';
import mongoose from 'mongoose';
import Log from 'debug-logger';

// Express App
const app = express();
// Database configuration
const dbUsername = 'mz_eLingUser';
const dbPassword = 'sandimz_eLingUser';
const dbServer = '127.0.0.1';
const dbPort = '17027';
const dbName = 'mz_eLing';
const dbURL = `mongodb://${dbUsername}:${dbPassword}@${dbServer}:${dbPort}/${dbName}`;
mongoose.Promise = global.Promise;
mongoose.connect(dbURL);

// Debug
const log = Log('app');

// Root
// Express app
const app = express();
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
