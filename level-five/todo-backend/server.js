const express = require('express');
const app = express();

app.use(express.json());

app.use('/todo', require('./routes/todos.js'))

app.listen(9000)