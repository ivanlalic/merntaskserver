const express = require('express');

//import our function
const connectDB = require('./config/db')

//Import CORS
const cors = require('cors');

// Create server
const app = express();

//connect to DB
connectDB();

//Able CORS
app.use(cors());


//Use express.json
app.use(express.json({ extended: true }));

//App port
const port = process.env.PORT || 4000;

//Import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

//Start APP
app.listen(port, '0.0.0.0', ()=> {
    console.log(`Server is running on port ${port}`)
})
