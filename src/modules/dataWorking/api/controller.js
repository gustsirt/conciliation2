import data01Service from "../../data01/logic/service.js"
import data02Service from "../../data02/logic/service.js"
import WorkingService from "../logic/service.js"

export default class WorkController {
  constructor(){
    this.service = new WorkingService(data01Service, data02Service)
  }

  link = async (req, res) => {
    const {configObject} = req.body
    if (!configObject) return res.sendUserError()

    const response = await this.service.link(configObject)
    res.sendSuccess(response)
  }
}