import * as createError from 'http-errors';
import * as logger from 'morgan';
import * as express from 'express';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as RateLimit from 'express-rate-limit';

import routes from './routes/v1';

dotenv.config();

const app = express();
// limiter that sets requests to 50 per-hour
const limiter = new RateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // 50 requests per-hour
  message: 'Too many requests, please try again after an hour.'
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(limiter);

// V1 routes
app.use('/api/v1', routes);

// catch 404 and forward to error handler
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
  next(createError(404, 'This route doesn\'t exist'));
});

// error handler
app.use((err: createError.HttpError, req: express.Request, res: express.Response, next: express.NextFunction): express.Response | void => {
  if (err) {
    return res.status(err.status || 500).json(err);
  }
});

// use with any ts file (i.e in setting up test)
export { app }

// use with non-ts file (i.e in bin/www script to run the application)
exports.app = app;
