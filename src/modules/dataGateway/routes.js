import { Router } from "express";
import GatewayController from "./controller.js";

const router = Router();
const uControl = new GatewayController()

//api/files/XX/
export default router
.post('/link', uControl.link)