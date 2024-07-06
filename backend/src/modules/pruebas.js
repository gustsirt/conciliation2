import { Router } from "express";
import { handleAuth } from "../middleware/handlePolicies.js";

const router = Router();

const access = ['USER']

//http://localhost:8080/api/pruebas
router
  .get ('/', handleAuth(access) ,(req, res)=>{
    res.sendSuccess({access, user: req.user}, "Pruebas")
  })


  export default router