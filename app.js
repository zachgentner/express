// Import Express.js
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const logger = require('./middleware/logger');

// Initialize an Express.js variable
const app = express();

// Initializes the logger middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Body Parses Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// When running server side, rather than on port 5000, it will be in an env variable.
const PORT = process.env.PORT || 5555;

// Listen on a port
app.listen(PORT, console.log(`Server started on port ${PORT}`));

// Serve an html file with .sendFile(); Not ideal.
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// Set a static folder with .use() to include middleware
app.use(express.static(path.join(__dirname, 'public')));

// Require the Members API routes
app.use('/api/members', require('./routes/api/members'));
