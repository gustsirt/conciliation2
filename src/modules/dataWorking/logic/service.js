class WorkingService {
  constructor (data01Service, data02Service) {
    this.data01Service = data01Service
    this.data02Service = data02Service
    this.data01 = []
    this.data02 = []
    this.verif1 = [ "flag", "origin_date", "batch", "number", "amount" ]
  }

  link = async (configObject) => {
    console.log("configObject: ",configObject);
    
    // obtiene los datos segun los filtros
    this.data01 = await this.data01Service.get(configObject.filter01)
    console.log("data 01: ", "this.data01");

    this.data02 = await this.data02Service.get(configObject.filter02)
    console.log("data 02: ", "this.data02");

    // realiza la conciliación
    for (let ope of this.data01) {
      console.log(ope._id);
      let cc = 0
      let matchingId = null;

      for (let ope2 of this.data02) {
        let equal = true;

        for (let val of this.verif1) {
          // Handle date objects
          if (typeof ope[val] == "object" && ope[val] !== null) {
            if (new Date(ope[val]).getTime() !== new Date(ope2[val]).getTime()) {
              equal = false;
              break;
            }
          // Handle others objects
          } else if (ope[val] !== ope2[val]) {
            equal = false
            break;
          }
        }

        // si hay igualdad (en los valores definidos)
        if (equal) {
          cc += 1
          matchingId = ope2._id;
          console.log("  ",ope2._id, " - cc: ",cc);
        }
      } // end ope2

      // Asigna a ope resultado
      cc === 1 ? ope.idMeeting = matchingId : ope.idMeeting = null;
      ope.meetings = cc;

      // Guarda lso datos
      await this.data01Service.update(ope._id, {
        idMeeting: ope.idMeeting,
        meetings: ope.meetings
      });

    } // end ope
    return {configObject, data1: this.data01, data2: "this.data02"}
  }

  // para cruzar todo
  // 1 debo recibir los filtros OK
  // 2 se obtiene las tablas a cruzar OK
  // 3 se inicia con la tabla que manda (y se la recorre entera) OK
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