// Importing Modules
// ===================================
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
// ===================================



// ===================================
// Import Routes.
const authRoute = require('./routes/auth.js');
const postsRoute = require('./routes/posts.js');
// ===================================



// ===================================
// Application setup
const app = express();
const PORT = process.env.PORT || 4040;
// ===================================




// ===================================
// Database Connection
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
        //     useCreateIndex: true
}).then(() => {
    console.log('Server Connected Successfully')
}).catch(err => {
    console.log(err.message);
});
// ===================================




// ===================================
// Parsing Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
// ===================================




// ===================================
//Sample Route Configuration
app.get('/', (req, res) => { res.status(200).send('JWT API Authentication project') });
// ===================================



// ===================================
// Route Middlewares.
app.use('/users', authRoute);
app.use('/users/posts', postsRoute);
// ===================================




// ===================================
// Server Initialisation
app.listen(PORT, () => { console.log(`Server Application running at http://localhost:${PORT}`); });
// ===================================