const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connnect to database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { useMongoClient: true, promiseLibrary: require('bluebird') })
    .then(() => console.log(`Connected to database ${config.database}`))
    .catch((err) => console.log(`Database error: ${err}`));

const app = express();
const users = require('./routes/users');

const port = 3000; //port number

//Cors Middleware
app.use(cors());

//set static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser Middleware
app.use(bodyParser.json());

//Body Parser Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// /GET Connect
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// port start server
app.listen(port, () =>{
    console.log('Server started on port '+port);
});
