const express = require('express');
const testData = require('./MOCK_DATA.json');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('Recieved get request');
  res.send(testData);
});

app.listen(3000, () => console.log('Server working on port 3000'));
