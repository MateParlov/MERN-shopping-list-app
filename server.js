const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());
//DB Config
const db = process.env.ATLAS_URI;
//connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('MongoDb connected'))
  .catch(err => console.log(err));

const port = process.env.PORT || 5000;

const items = require('./routes/api/items');

app.use('/api/items', items);

//serve static assets if in production
if ((process.env.NODE_ENV = 'production')) {
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
