import { Router } from "express";
import upload from "../../../libraries/multer.js";
import Data02Controller from "./controller.js";

const router = Router();
const uControl = new Data02Controller();

//api/files/02/
export default router
  .get ('/', uControl.get)
  .post('/fromFile/', upload.single('file'), uControl.createfromFile)
  .get ('/unique/:field', uControl.getUniqueValue)