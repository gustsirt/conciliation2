import { Router } from "express";
import Controller from "./controller.js";
import { handleAuth } from "../../../middleware/handlePolicies.js";
import wrapRoutesWithCatchAsync from "../../../libraries/utils/wrapRoutesWithCatchAsync.js";

const router = Router();
const controller = new Controller();

//http://localhost:8080/api/users
router
  .get    ('/',         handleAuth(['USER']), controller.get)
  .put    ('/:eid',     handleAuth(['USER']), controller.updateId) //falta actualizar usuario
  .delete ('/:eid',     handleAuth(['USER']), controller.deleteId)  //falta eliminar usuario

router
  .get    ('/current',  handleAuth(['USER']), controller.getUserSession)
  .post   ('/register',                       controller.register)
  .post   ('/login',                          controller.login)
  .post   ('/logout',   handleAuth(['USER']), controller.logout )

wrapRoutesWithCatchAsync(router)

export default router