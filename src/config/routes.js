import { Router } from "express";
// import errorHandler from "../middleware/handleError.js";
import fileRoutes01 from "../modules/data01/api/routes.js";
import fileRoutes02 from "../modules/data02/api/routes.js";
import dataWork from "../modules/dataWorking/api/routes.js";
import userRoutes from "../modules/user/api/routes.js";
import prueba from "../modules/pruebas.js";


const router = Router();

export default router
  .get('/', (req, res) => res.sendSuccess({}, 'Hello World!'))
  .use('/api/users', userRoutes)
  .use('/api/files/01/', fileRoutes01)
  .use('/api/files/02/', fileRoutes02)
  .use('/api/link/', dataWork)
  .use('/api/pruebas', prueba)
  .get('*', (req, res) => res.sendNotFound())
  //.use(errorHandler)