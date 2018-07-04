# express-api-kit
A express.js based API project kit. 

## Installation
##### Clone project
```bash
git clone https://github.com/oppytut/express-api-kit.git && cd express-api-kit
```
##### Install packages
```bash
npm install
```
##### Run
For development mode with webpack watch:
```bash
npm run dev
```
For production mode:
```bash
npm run start
```
##### Access http://localhost:8000 through the browser

## Configuration
The configuration files are in the configs directory.
##### Database
```javascript
const username = 'mz_petuahUser';
const password = 'sandimz_petuahUser';
const host = '127.0.0.1';
const port = '17027';
const name = 'mz_petuah';
```
A <code>name</code> variable for database name.
##### Server
Server port can be configured.
```javascript
const port = 8000;
```
##### CORS (Cross-Origin Resource Sharing)
Clients that can access the API can be configured.
```javascript
const whiteList = ['http://localhost:3000'];

const corsOptions = (req, cb) => {
  const options = {
    origin: whiteList.indexOf(req.header('Origin')) !== -1,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  };
  cb(null, options);
};
```
##### JWT (JSON Web Token)
JWT secret code can be configured.
```javascript
const jwtConfig = {
  secret: 'g0r3ng4nH4ng4t',
};
```
##### Bcrypt
Bcrypt salt rounds can be configured.
```javascript
const bcryptConfig = {
  saltRounds: 10,
};
```

## Demo
A demo can be accessed on <code>https://exa.mazovi.com/api/ ... (GET/POST/PUT/DELETE)</code>.

## Todo
- [x] Configure Git, NPM, and Eslint (airbnb)
- [x] Add and Configure Webpack (auto reload)
- [ ] Add GraphQL and Apollo Server
- [ ] Add Redis
- [ ] Publish helpers to NPM
