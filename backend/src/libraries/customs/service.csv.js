import CustomService from "./service.js";

import Papa from 'papaparse';

class CustomServiceCsv extends CustomService {
  constructor (dao, DTO) {
    super(dao)
    this.DTO = DTO
  }
  // constructor(dao) {
  //   this.dao = dao;
  // }
  // create      = async (newElement)         => await this.dao.create     (newElement)
  // get         = async (filter)             => await this.dao.get        (filter)
  // getPaginate = async (filter, options)    => await this.dao.getPaginate(filter, options)
  // getBy       = async (filter)             => await this.dao.getBy      (filter)
  // update      = async (eid, elementUpdate) => await this.dao.update     ({_id: eid}, elementUpdate)
  // delete      = async (filter)             => await this.dao.delete     (filter)
  // exists      = async (filter)             => await this.dao.exists     (filter)
  // getUniquesValues = async (field)         => await this.dao.distinct   (field);


  // Devuelve un objeto a partir de un file.buffer (multer) con un DTO
  fileToObject = async (file, oneColumn, noInclude, user) => {
    const csvData = Papa.parse(file.buffer.toString(), {
      header: true,
    });

    const filteredData = csvData.data.filter(e => e[oneColumn] != '' && e[oneColumn] && !e[oneColumn].includes(noInclude))

    // aplica el DTO a todo el array
    const transformedData = filteredData.map(obj => new this.DTO(obj, user));
    return transformedData;
  }

  // Método en el servicio separar los datos nuevos de lo ya incorporados en la Base de Datos
  checkExistingData = async (newData, filterFields) => {
    try {
      let existingData = [];
      let newDataToCreate = [];

      for (const item of newData) {
        // define filtro dinamico
        const filter = {};
        filterFields.forEach(field => {
          if (item[field]) {
            filter[field] = item[field];
          }
        });

        const existingItem = await this.dao.getBy(filter);

        if (existingItem) {
          existingData.push(existingItem);
        } else {
          newDataToCreate.push(item)
        }
      }

      // Devuelve los datos existentes encontrados en la base de datos y los nuevos datos únicos
      return {existingData, newDataToCreate};
    } catch (error) {
      throw new Error("Error al verificar datos existentes en la base de datos: " + error.message);
    }
  }

  // Método en el servicio para guardar los nuevos datos en la base de datos
  saveNewData = async (newData) => {
    try {
      return await this.dao.createMany(newData);
    } catch (error) {
      throw new Error("Error al guardar los nuevos datos en la base de datos: " + error.message);
    }
  }

  areEqual = (obj1, obj2, fieldsToCompare) => {
    return fieldsToCompare.every(field => obj1[field] === obj2[field]);
  };
}

export default CustomServiceCsv