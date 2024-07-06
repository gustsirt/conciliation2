import { Router } from "express";
import upload from "../../../libraries/multer.js";
import Data01Controller from "./controller.js";

const router = Router();
const uControl = new Data01Controller();

//api/files/01
export default router
  .get ('/', uControl.get)
  .post('/', uControl.create)
  .put('/:eid', uControl.updateId)
  .delete('/:eid', uControl.deleteId)
  .post('/fromFile/', upload.single('file'), uControl.createfromFile)
  .get ('/unique/:field', uControl.getUniqueValue)
  .get ('/summary', uControl.summary)