import express from 'express';
//import 

const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
    console.log(`Server running on port : ${PORT}`)
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded ({extended : false}));
app.use(cookieParser());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token");
    res.header('Access-Control-Allow-Methods', 'GET,PATCH, PUT,POST');
    next();
  });
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);