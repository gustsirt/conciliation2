import { Router } from "express";
import errorHandler from "../middleware/handleError.js";
import fileRoutes from "../modules/data01/api/routes.js";

const router = Router();

export default router
  .get('/', (req, res) => res.sendSuccess({}, 'Hello World!'))
  .use('/api/files', fileRoutes)
  .get('*', (req, res) => res.sendNotFound())
  .use(errorHandler)