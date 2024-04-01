import { Router } from "express";
import upload from "../logic/multer.js";
import Data01Controller from "./controller.js";

const router = Router();
const oneControl = new Data01Controller();

//api/files
export default router
  .get ('/', oneControl.get)
  .post('/fromFile/', upload.single('file'), oneControl.createfromFile)