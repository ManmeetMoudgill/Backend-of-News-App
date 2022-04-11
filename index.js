const express = require('express')
const app = express();
var cors = require('cors');
const port = process.env.PORT || 8080;
require('dotenv').config();

//used the express.json() to parse the body of the request
app.use(express.json());
app.use(cors());


//creating routes here
app.use('/news',require('./routes/news'));
app.use('/singleNews',require('./routes/singleNews'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})