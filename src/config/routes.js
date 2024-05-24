import { Router } from "express";
import errorHandler from "../middleware/handleError.js";
import fileRoutes01 from "../modules/data01/api/routes.js";
import fileRoutes02 from "../modules/data02/api/routes.js";
import dataWork from "../modules/dataWorking/api/routes.js";

const router = Router();

export default router
  .get('/', (req, res) => res.sendSuccess({}, 'Hello World!'))
  .use('/api/files/01/', fileRoutes01)
  .use('/api/files/02/', fileRoutes02)
  .use('/api/files/XX/', dataWork)
  .get('*', (req, res) => res.sendNotFound())
  //.use(errorHandler)