import { Router } from "express";
import upload from "../../../libraries/multer.js";
import Data01Controller from "./controller.js";

const router = Router();
const uControl = new Data01Controller();

//api/files
export default router
  .get ('/', uControl.get)
  .post('/fromFile/', upload.single('file'), uControl.createfromFile)