class WorkingService {
  constructor (data01Service, data02Service) {
    this.data01Service = data01Service
    this.data02Service = data02Service
    this.data01 = []
    this.data02 = []
    this.verif1 = [ "flag", "origin_date", "batch", "number", "amount" ]
  }

  mark = async (configObject) => {
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

  cleanMarks = async (configObject) => {
    // obtiene los datos
    this.data01 = await this.data01Service.get(configObject.filter01);
    this.data02 = await this.data02Service.get(configObject.filter02);

    // Prepara las actualizaciones para limpiar las marcas en data01
    const data01Updates = this.data01.map(ope => ({
      _id: ope._id,
      idMeeting: null,
      meetings: null
    }));

    // Prepara las actualizaciones para limpiar las marcas en data02
    const data02Updates = this.data02.map(ope2 => ({
      _id: ope2._id,
      idMeeting: null,
      meetings: null
    }));

    // Ejecuta las actualizaciones en paralelo
    await Promise.all([
      ...data01Updates.map(update => this.data01Service.update(update._id, update)),
      ...data02Updates.map(update => this.data02Service.update(update._id, update))
    ]);

    return { configObject, data1: this.data01, data2: this.data02 };
  }

  markMatching = async (id1, id2) => {
    // Obtiene las operaciones por ID
    const ope1 = await this.data01Service.getBy({_id: id1});
    const ope2 = await this.data02Service.getBy({_id: id2});

    if (!ope1 || !ope2) {
      throw new Error('Operación no encontrada en una de las tablas.');
    }

    // Marca las operaciones
    ope1.idMeeting = id2;
    ope1.meetings = 1;

    ope2.idMeeting = id1;
    ope2.meetings = 1;

    // Actualiza las operaciones
    await this.data01Service.update(id1, {
      idMeeting: ope1.idMeeting,
      meetings: ope1.meetings
    });

    await this.data02Service.update(id2, {
      idMeeting: ope2.idMeeting,
      meetings: ope2.meetings
    });

    console.log(`Operaciones ${id1} y ${id2} marcadas como coincidentes.`);
    return { ope1, ope2 };
  }

  cleanMark = async (id, tableNumber) => {
    if (tableNumber === 1) {
      // Limpia la marca en data01
      const ope = await this.data01Service.getBy({_id: id});
      if (!ope) {
        throw new Error(`Operación con ID ${id} no encontrada en data01.`);
      }

      ope.idMeeting = null;
      ope.meetings = 0;

      await this.data01Service.update(id, {
        idMeeting: ope.idMeeting,
        meetings: ope.meetings
      });

      console.log(`Marca limpiada en operación ${id} de data01.`);
      return ope;
    } else if (tableNumber === 2) {
      // Limpia la marca en data02
      const ope = await this.data02Service.getById(id);
      if (!ope) {
        throw new Error(`Operación con ID ${id} no encontrada en data02.`);
      }

      ope.idMeeting = null;
      ope.meetings = 0;

      await this.data02Service.update(id, {
        idMeeting: ope.idMeeting,
        meetings: ope.meetings
      });

      console.log(`Marca limpiada en operación ${id} de data02.`);
      return ope;
    } else {
      throw new Error('Número de tabla inválido. Debe ser 1 o 2.');
    }
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