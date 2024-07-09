import { Router } from "express";
import fileRoutes01 from "../modules/data01/api/routes.js";
import fileRoutes02 from "../modules/data02/api/routes.js";
import dataWork from "../modules/dataWorking/api/routes.js";
import userRoutes from "../modules/user/api/routes.js";
import prueba from "../modules/pruebas.js";

const router = Router();

router
  .get('/', (req, res) => res.sendSuccess({}, 'Hello World!'))
  .use('/api/users', userRoutes)
  .use('/api/files/01/', fileRoutes01)
  .use('/api/files/02/', fileRoutes02)
  .use('/api/link/', dataWork)
  .use('/api/pruebas', prueba)
  .all('*', (req, res, next) => { next(new AppError(`No se encuentra la url: ${req.originalUrl} en este servidor`, 404)); })

// router
//   .use(handleEspecificErrors)
//   .use(handleGenericErrors)

  export default router