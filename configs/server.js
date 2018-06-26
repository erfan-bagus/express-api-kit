import debugLogger from 'debug-logger';

const log = debugLogger('server');

const mode = process.env.NODE_ENV;
const port = 8000;

const server = (app) => {
	app.listen(port, (err) => {
		log.info(`mode: ${mode}`);
		log.info(`port: ${port}`);

		if (err) {
			log.error('cannot be listening');
			throw err;
		}
	});
};

export default server;
