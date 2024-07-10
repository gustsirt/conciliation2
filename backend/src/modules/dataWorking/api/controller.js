import data01Service from "../../data01/logic/service.js"
import data02Service from "../../data02/logic/service.js"
import WorkingService from "../logic/service.js"

export default class WorkController {
  constructor(){
    this.service = new WorkingService(data01Service, data02Service)
  }

  mark = async (req, res) => {
    const {configObject} = req.body
    if (!configObject) return res.sendUserError("No se incluyo el objeto de configuracion")

    const response = await this.service.mark(configObject)
    res.sendSuccess(response)
  }

  cleanMarks = async (req, res) => {
    const {configObject} = req.body
    if (!configObject) return res.sendUserError("No se incluyo el objeto de configuracion")

    const response = await this.service.cleanMarks(configObject)
    res.sendSuccess(response)
  }

  markMatching = async (req, res) => {
    const {id1, id2} = req.params
    if (!id1 || !id2) return res.sendUserError("Datos necesarios incompletos")

    const response = await this.service.markMatching(id1, id2)
    res.sendSuccess(response)
  }

  cleanMark = async (req, res) => {
    const {id, tableNumber} = req.params
    if (!id || !tableNumber) return res.sendUserError("Datos necesarios incompletos")
    if (tableNumber*1!= 1 && tableNumber*1!= 2) return res.sendUserError("El numero de la tabla no es valido")

    const response = await this.service.cleanMark(id, Number(tableNumber))
    res.sendSuccess(response)
  }

  summary = async (req, res) => {
    const { service, flag, business_number, payment_month } = req.query;

    const match1 = {};
    const match2 = {};

    if (flag) {
      match1.flag = flag;
      match2.flag = flag;
    }
    if (payment_month) match1.payment_month = parseInt(payment_month, 10);
    if (service) match1.service = service;
    if (business_number) match1.business_number = business_number;

    console.log("funcion summary");
    const summary = await this.service.summary(match1, match2)
    res.sendSuccess(summary || "funcion summary")
  }

}