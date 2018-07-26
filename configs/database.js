import mongoose from 'mongoose';
import debugLogger from 'debug-logger';

const log = debugLogger('database');

const username = 'mamas';
const password = 'sandinemamas';
const host = '127.0.0.1';
const port = '27017';
const name = 'ms_petuah';
const url = `mongodb://${username}:${password}@${host}:${port}/${name}`;

const database = () => {
	mongoose.Promise = global.Promise; // resolve UnhandledPromiseRejectionWarning
	mongoose.connect(url);

	mongoose.connection.on('error', () => {
		log.error('failed to connect');
	});
	mongoose.connection.once('open', () => {
		log.info('successfully connect');
	});
};

export default database;
