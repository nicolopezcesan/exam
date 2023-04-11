require('dotenv').config()
const express = require('express');
const cors = require('cors');
const displayRoutes = require('express-routemap');

const apiRoute = require('./src/routes');
const { errorHandlerMiddleware } = require('./src/middlewares/error-handlers');

const { PORT, HOST } = require('./src/config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/v1', apiRoute);

app.use(errorHandlerMiddleware);

app.listen(PORT, HOST, () => {
  displayRoutes(app);
  console.log(`Server running on http://${HOST}:${PORT}`);
});
