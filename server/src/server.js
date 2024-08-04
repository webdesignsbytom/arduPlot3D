import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
// Path
import path from 'path';
import * as url from 'url';
import { join } from 'path';

// Import routers
import authRouter from './routes/auth.js';
import userRouter from './routes/users.js';
import eventRouter from './routes/events.js';
import simulationRouter from './routes/simulations.js';
import libraryRouter from './routes/library.js';

const app = express();
app.disable('x-powered-by');

// Add middleware
app.use(
  cors({ 
    origin: "*"
  })
);

const PORT = process.env.PORT || 7000;
const HTTP_URL = process.env.HTTP_URL;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get the directory name
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Start of actions
app.use('/', authRouter);
app.use('/users', userRouter);
app.use('/events', eventRouter);
app.use('/simulations', simulationRouter);
app.use('/library', libraryRouter);

// Server interface page
app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: join(__dirname, 'views'),
  });
});

app.get('/test', (req, res) => {
  res.status(200).send('Congratulations Mr Bond you found my server lair.')
});

// For all unknown requests 404 page returns
app.all('*', (req, res) => {
  res.status(404);
  if (req.accepts('html')) {
    res.sendFile(join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({ message: '404 Not Found' });
  } else {
    res.type('txt').send('404 Not Found');
  }
});

app.use((error, req, res, next) => {
  console.error(error)

  if (error.code === 'P2025') {
    return sendDataResponse(res, 404, 'Record does not exist')
  }

  return sendDataResponse(res, 500)
})

// Start our API server
app.listen(PORT, () => {
  console.log(
    `\nServer is running on ${HTTP_URL}${PORT} \n This no longer consumes chocolate\n`
  );
});
