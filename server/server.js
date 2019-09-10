const express = require('express');
const cors = require('cors');
const path = require('path');
const testData = require('./MOCK_DATA.json');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/../client/build/index.html'));
});

app.get('/', (req, res) => {
  console.log('Recieved get request');
  res.send(testData);
});

app.listen(3000, () => console.log('Server working on port 3000'));
