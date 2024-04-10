import GatewayService from "./service.js"
//import data01Service from "../data01/logic/service.js"
//import data02Service from "../data02/logic/service.js"

export default class GatewayController {
  constructor(){
    this.service = new GatewayService(data01Service, data02Service)
  }

  link = (req, res) => {
    res.sendSuccess("Link")
  }

}