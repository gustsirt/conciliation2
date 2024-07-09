import express from 'express';
import program from './config/commander.js';
import configEnv from './config/env.js';
import cors from 'cors';
import __dirname from './libraries/utils/dirname.js';
import { connectDb } from './config/conectMongo.js';
import { addLogger, logger } from './middleware/logger.js';
import handleResponses from './middleware/handleResponses.js';
import initializePassport from './modules/user/config/passport.config.js';
import passport from 'passport';
import appRouter from './config/routes.js';
import { handleEspecificErrors, handleGenericErrors } from './middleware/handleErrors.js';

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

// passport
initializePassport()
app.use(passport.initialize())

// App Routes --------------------------------
app.use(appRouter);

// Manejo de errores --------------------------------
app.use(handleEspecificErrors)
app.use(handleGenericErrors)

app.listen(port, () => {
  logger.info(`Server running on port: ${port}`);
})