const express = require('express');
const cors = require('cors');
const path = require('path');
const testData = require('./MOCK_DATA.json');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '/../dist')));
app.use(cors());

app.get('/api', (req, res) => {
  console.log('Recieved get request on api');
  res.send(testData);
});

app.get('*', (req, res) => {
  console.log('recieved get on *');
  res.sendFile(path.join(__dirname + '/../dist/index.html'));
});

app.listen(3000, () => console.log('Server working on port 3000'));
