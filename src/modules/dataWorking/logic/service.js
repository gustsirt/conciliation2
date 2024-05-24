class WorkingService {
  constructor (data01Service, data02Service) {
    this.data01Service = data01Service
    this.data02Service = data02Service
    this.data01 = {}
    this.data02 = {}
  }

  link = async (configObject) => {
    console.log("configObject: ",configObject);
    
    this.data01 = await this.data01Service.get(configObject.filter1)
    console.log("data 01: ", this.data01);

    this.data02 = await this.data02Service.get(configObject.filter2)
    console.log("data 02: ", "this.data02");

    return {configObject, data1: this.data01, data2: this.data02}
  }

  // para cruzar todo
  // 1 debo recibir los filtros OK
  // 2 se obtiene las tablas a cruzar OK
  // 3 se inicia con la tabla que manda (y se la recorre entera)
  // 4 se puede poner un valor de referencia
  // 5 se prueba con la segunda tabla
  // 6 se realiza el cruce con un ejemplo
  // 7 se prueba en pocos
  // 8 prueba general
}

export default WorkingService

/*
{"configObject": {
    "filter1": {
        "flag": "visa",
        "payment_month": 3
    },
    "filter2": {
        "flag": "visa"
    }
}}
*/