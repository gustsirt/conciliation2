import { Router } from "express";
import UsersController from "./controller.js";

const router = Router();
const uControl = new UsersController();

//http://localhost:8080/api/users
router
  .get ('/', uControl.get)
  .put('/:eid', uControl.updateId) //falta actualizar usuario
  .delete('/:eid', uControl.deleteId)  //falta eliminar usuario

router
  .post('/register', uControl.register)
  .post('/login', uControl.login)

  export default router