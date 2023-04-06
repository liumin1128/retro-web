const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/dist'));

app.listen(3102, () => {
  console.log('Server is running on port 3102');
});
