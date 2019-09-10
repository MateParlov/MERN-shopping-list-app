const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
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

app.listen(port, () => {
  console.log(`Server started on PORT: ${port}`);
});
