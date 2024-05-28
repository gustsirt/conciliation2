class WorkingService {
  constructor (data01Service, data02Service) {
    this.data01Service = data01Service
    this.data02Service = data02Service
    this.data01 = []
    this.data02 = []
    this.verif1 = [ "flag", "origin_date", "batch", "number", "amount" ]
  }

  link = async (configObject) => {
    // obtiene los datos segun los filtros
    this.data01 = await this.data01Service.get(configObject.filter01)
    this.data02 = await this.data02Service.get(configObject.filter02)

    const matchedOperations = {};

    // realiza la conciliación
    for (let ope of this.data01) {
      let cc = 0
      let matchingId = null;

      for (let ope2 of this.data02) {
        let equal = true;

        for (let val of this.verif1) {
          if (typeof ope[val] == "object" && ope[val] !== null) {
            if (new Date(ope[val]).getTime() !== new Date(ope2[val]).getTime()) {
              equal = false;
              break;
            }
          } else if (ope[val] !== ope2[val]) {
            equal = false
            break;
          }
        }

        // si hay igualdad (en los valores definidos)
        if (equal) {
          cc += 1
          matchingId = ope2._id;

          if (!matchedOperations[ope2._id]) {
            matchedOperations[ope2._id] = [];
          }
          matchedOperations[ope2._id].push(ope._id);
        }
      } // end ope2

      // Actualiza datos ope1
      cc === 1 ? ope.idMeeting = matchingId : ope.idMeeting = null;
      ope.meetings = cc;

    } // end ope

     // Prepara las actualizaciones para data01 y data02
    const data01Updates = this.data01.map(ope => ({
      _id: ope._id,
      idMeeting: ope.idMeeting,
      meetings: ope.meetings
    }));

    const data02Updates = this.data02.map(ope2 => {
      const matchingOpeIds = matchedOperations[ope2._id] || [];
      const cc = matchingOpeIds.length;
      const matchingId = cc === 1 ? matchingOpeIds[0] : null;

      return {
        _id: ope2._id,
        idMeeting: matchingId,
        meetings: cc
      };
    });

    // Ejecuta las actualizaciones en paralelo
    await Promise.all([
      ...data01Updates.map(update => this.data01Service.update(update._id, update)),
      ...data02Updates.map(update => this.data02Service.update(update._id, update))
    ]);

    return { configObject, data1: this.data01, data2: this.data02 };
  }
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