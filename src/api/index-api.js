const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const config = require('../../config');
const errors = require('../network/errors');
const swaggerDoc = require('./swagger.json');

//Components
const user = require('./components/user/network');
const auth = require('./components/auth/network');

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Router
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

//Error middleware
app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Api escuchando en el puerto ${config.api.port}`);
});