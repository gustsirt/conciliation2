import data01Service from "../../data01/logic/service.js"
import data02Service from "../../data02/logic/service.js"
import WorkingService from "../logic/service.js"

export default class WorkController {
  constructor(){
    this.service = new WorkingService(data01Service, data02Service)
  }

  mark = async (req, res) => {
    try {
      const {configObject} = req.body
      if (!configObject) return res.sendUserError("No se incluyo el objeto de configuracion")
  
      const response = await this.service.mark(configObject)
      res.sendSuccess(response)
    } catch (error) {
      res.sendCatchError(error)
    }
  }

  cleanMarks = async (req, res) => {
    try {
      const {configObject} = req.body
      if (!configObject) return res.sendUserError("No se incluyo el objeto de configuracion")
  
      const response = await this.service.cleanMarks(configObject)
      res.sendSuccess(response)
    } catch (error) {
      res.sendCatchError(error)
    }
  }

  markMatching = async (req, res) => {
    try {
      const {id1, id2} = req.params
      if (!id1 || !id2) return res.sendUserError("Datos necesarios incompletos")
  
      const response = await this.service.markMatching(id1, id2)
      res.sendSuccess(response)
    } catch (error) {
      res.sendCatchError(error)
    }
  }

  cleanMark = async (req, res) => {
    try {
      const {id, tableNumber} = req.params
      if (!id || !tableNumber) return res.sendUserError("Datos necesarios incompletos")
      if (tableNumber*1!= 1 && tableNumber*1!= 2) return res.sendUserError("El numero de la tabla no es valido")
  
      const response = await this.service.cleanMark(id, Number(tableNumber))
      res.sendSuccess(response)
    } catch (error) {
      res.sendCatchError(error)
    }
  }

}