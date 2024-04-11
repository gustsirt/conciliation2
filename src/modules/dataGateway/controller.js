import GatewayService from "./service.js"
import data01Service from "../data01/logic/service.js"
import data02Service from "../data02/logic/service.js"

export default class GatewayController {
  constructor(){
    this.service = new GatewayService(data01Service, data02Service)
  }

  link = (req, res) => {
    const {configObject} = req.body
    if (!configObject) return res.sendUserError()

    console.log(configObject);
    res.sendSuccess(configObject)
  }

  // para cruzar todo
  // 1 debo recibir los filtros
  // 2 se obtiene las tablas a cruzar
  // 3 se inicia con la tabla que manda (y se la recorre entera)
  // 4 se puede poner un valor de referencia
  // 5 se prueba con la segunda tabla
  // 6 se realiza el cruce con un ejemplo
  // 7 se prueba en pocos
  // 8 prueba general
}