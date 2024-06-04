import express from 'express';
import program from './config/commander.js';
import configEnv from './config/env.js';
import cors from 'cors';
import { connectDb } from './config/conectMongo.js';
import __dirname from './libraries/dirname.js';
import handleResponses from './middleware/handleResponses.js';
import { addLogger, logger } from './libraries/logger.js';
import appRouter from './config/routes.js';

// App initialization ------------------------------
const {mode} = program.opts();
logger.info('Mode config: ' + mode);

const app = express()

// App Configurations --------------------------------
app.use(cors(
  {origin: configEnv.cors_origin}
)); //{ origin: configObject.cors_origin }
const port = configEnv.port || 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'))

// App Data Source Configuration --------------------------------
connectDb()

// App Middleware --------------------------------
app.use(addLogger)
app.use(handleResponses)

// App Routes --------------------------------
app.use(appRouter);

app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
})