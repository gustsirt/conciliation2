import { Router } from "express";
import WorkController from "./controller.js";
import wrapRoutesWithCatchAsync from "../../../libraries/utils/wrapRoutesWithCatchAsync.js";

const router = Router();
const uControl = new WorkController()

//api/link/
router
.post('/mark', uControl.mark)
.delete('/mark', uControl.cleanMarks)
.post('/match/:id1/:id2', uControl.markMatching)
.delete('/match/:id/:tableNumber', uControl.cleanMark)
.get ('/summary', uControl.summary)

wrapRoutesWithCatchAsync(router)

export default router