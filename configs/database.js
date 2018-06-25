import mongoose from 'mongoose';
import debugLogger from 'debug-logger';

const log = debugLogger('database');

const username = 'mz_petuahUser';
const password = 'sandimz_petuahUser';
const host = '127.0.0.1';
const port = '17027';
const name = 'mz_petuah';
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
