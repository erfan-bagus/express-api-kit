import cors from 'cors';

const whiteList = ['http://localhost:3000'];

const corsOptions = (req, cb) => {
	const options = {
		origin: whiteList.indexOf(req.header('Origin')) !== -1,
		optionsSuccessStatus: 200,
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
	};
	cb(null, options);
};

const configureCors = (app) => {
	app.use(cors(corsOptions));
};

export default configureCors;
