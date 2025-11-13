const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const attachUser = require('./middleware/attachUser');
const habitRoutes = require('./routes/habitRoutes');
const progressRoutes = require('./routes/progressRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(morgan('dev'));
app.use(attachUser);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Planner API running', user: req.user });
});

app.use('/api/habits', habitRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/users', userRoutes);

app.use((err, req, res, next) => {
  // eslint-disable-line
  console.error(err);
  res.status(err.status || 500).json({
    error: 'Algo salió mal. Respira profundo, revisa el mensaje y vuelve a intentar.',
    details: err.message,
  });
});

module.exports = app;
