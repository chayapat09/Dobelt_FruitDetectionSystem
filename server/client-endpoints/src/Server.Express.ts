import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';

import express, { NextFunction, Request, Response } from 'express';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';

import BaseRouter from './routes';
import EdgeRouter from './routes/edge'
import logger from '@shared/Logger';

const app = express();
const { BAD_REQUEST } = StatusCodes;

const cors = require('cors');

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

if (process.env.NODE_ENV === 'development') {
    app.use(cors({credentials : true , origin : true}));
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

// Show routes called in console during development
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Security
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs
app.use('/api', BaseRouter);
app.use('/edge' , EdgeRouter);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.err(err, true);
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});



/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

app.use(express.static(path.join(__dirname,'../../../','frontend','build')));

// app.use(express.static('build'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'../../../','frontend','build','index.html'));
});
// const viewsDir = path.join(__dirname, 'views');
// app.set('views', viewsDir);
// const staticDir = path.join(__dirname, 'public');
// app.use(express.static(staticDir));
// app.get('*', (req: Request, res: Response) => {
//     res.sendFile('index.html', {root: staticDir});
// });

// Export express instance
export default app;
