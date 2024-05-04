const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');
const helmet = require('helmet');

const {
  errorHandler,
  boomErrorHandler,
  ormValitationHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const options = {
  origin: '*',
};

app.use(helmet());
app.use(cors(options));

app.get('/api', (req, res) => {
  res.send('Hola mi server en Express');
});

routerApi(app);
app.use(ormValitationHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, '0.0.0.0', () => {
  console.log(`App escuchando en puerto ${port}`);
});
