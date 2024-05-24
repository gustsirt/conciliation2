import { Router } from "express";
import WorkController from "./controller.js";

const router = Router();
const uControl = new WorkController()

//api/files/XX/
export default router
.post('/link', uControl.link)