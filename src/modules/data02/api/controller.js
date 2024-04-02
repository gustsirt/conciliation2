import CustomController from "../../../libraries/customs/controller.js";
import data02Service from "../logic/service.js";

export default class Data01Controller extends CustomController {
  constructor() {
    super(data02Service);
  }

  createfromFile = async (req, res) => {
    try {
      const file = req.file;
      const user = req.user || null;

      // Convierte el archivo CSV en un objeto JavaScript
      const data = await this.service.fileToObject(file, "Estado", "ACREDITADO", user)
      // Separa los datos nuevos de lo ya incorporados en la Base de Datos
      const filterFields = ['flag', 'batch', 'number', 'origin_date', 'amount', 'client'];
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
} 