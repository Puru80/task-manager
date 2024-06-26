require('dotenv').config();

const express = require('express');
const app = express();

const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');

const errorHandler = require('./middleware/error-handler');

//middleware
app.use(express.static(__dirname + "/public"));
app.use(express.json());

app.use('/api/v1/tasks', tasks);

app.use(errorHandler);

const port = 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();