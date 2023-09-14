const connectToMongo = require('./db');
connectToMongo();
const express = require('express')
var cors = require('cors');
const port = 4000
//Available routes
var app = express();
app.use(cors());
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook listening on port ${port}`)
})
