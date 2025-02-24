import express, { Application } from 'express';
import cors from 'cors';
import MainRouter from './app/routes';
// import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

// Parsers
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

// Application Routes
app.use('/api', MainRouter);

app.get('/', (req, res) => {
  res.send('Price Api Backend!');
});

// app.use(globalErrorHandler);

export default app;
