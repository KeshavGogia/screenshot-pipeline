const express = require('express');
const routes = require('./routes/check');

const app = express();
const PORT = process.env.PORT || 8000;

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
