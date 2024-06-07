import { Router } from "express";
import WorkController from "./controller.js";

const router = Router();
const uControl = new WorkController()

//api/link/
export default router
.post('/mark', uControl.mark)
.delete('/mark', uControl.cleanMarks)
.post('/match/:id1/:id2', uControl.markMatching)
.delete('/match/:id/:tableNumber', uControl.cleanMark)
.get ('/summary', uControl.summary)