import CustomController from "../../../libraries/customs/controller.js";
import data01Service from "../logic/service.js";

export default class Data01Controller extends CustomController {
  constructor() {
    super(data01Service, ['service', 'flag', 'business_number', 'payment_month', 'meetings']);
  }

  createfromFile = async (req, res) => {
    try {
      const file = req.file;
      const user = req.user || null;

      // Convierte el archivo CSV en un objeto JavaScript
      const data = await this.service.fileToObject(file, "DETALLE", "Ajuste", user)
      
      // Separa los datos nuevos de lo ya incorporados en la Base de Datos
      const filterFields = ['business_number', 'batch', 'number', 'last_4_number', 'origin_date', 'payment_date', 'amount'];
      const { newDataToCreate } = await this.service.checkExistingData(data, filterFields);

      // Guarda solo los datos que no existen previamente
      if (newDataToCreate.length > 0) {
        const response = await this.service.saveNewData(newDataToCreate);
        res.sendSuccess(response, 'Datos subidos correctamente');
      } else {
        res.sendNoContent([], 'No se agregaron nuevos datos');
      }
    } catch (error) {
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
  getMonths = async (req, res) => {
    const { datefield } = req.params
    try {
      const months = await this.service.getMonths( datefield );
      res.sendSuccessOrNotFound(months);
    } catch (error) {
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }

  get = async (req, res) => {
    const {business_number, flag, payment_month} = req.query
    const filter = {}
    if( business_number ) filter["business_number"] = business_number;
    if( flag ) filter["flag"] = flag;
    if( payment_month ) filter["payment_month"] = payment_month;

    try {
      const element = await this.service.get(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
  summary = async (req, res) => {
    const { flag, payment_month } = req.params;
    try {
      console.log("funcion summary");
      const summary = await this.service.summary(flag, payment_month)
      res.sendSuccess(summary || "funcion summary")
    } catch (error) {
      res.sendCatchError(error, "An error occurred in the API request");
    }
  }
} 