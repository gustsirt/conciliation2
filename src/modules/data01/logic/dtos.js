import dayjs from "dayjs"

const mapFlag = {
  "MASTERCARD": "master",
  "MASTERCARD DEBITO": "master",
  "VISA": "visa",
  "VISA DEBITO": "visa"
};

const mapType = {
  "MASTERCARD": "c",
  "MASTERCARD DEBITO": "d",
  "VISA": "c",
  "VISA DEBITO": "d"
};


export class TransformOriginData {
  constructor(ObjectCsv, user = undefined) {
    this.service =           "Prisma"
    this.flag =              mapFlag[ObjectCsv.MARCA?.toUpperCase()] || '';
    this.type =              mapType[ObjectCsv.MARCA?.toUpperCase()] || '';
    this.business_number =   ObjectCsv.ESTABLECIMIENTO || '';
    this.batch =             Number(ObjectCsv.LOTE) || 0;
    this.number =            Number(ObjectCsv["NUM.CUPON"]) || 0;
    this.last_4_number =     ObjectCsv["NUM.TARJETA"] ? Number(ObjectCsv["NUM.TARJETA"].slice(-4)) : '';
    this.installment =       Number(ObjectCsv["CANT.CUOTAS"]) || 0;
    this.presentation_date = ObjectCsv.PRESENTACION ? parseDate(ObjectCsv.PRESENTACION) : null;
    this.origin_date =       ObjectCsv.COMPRA ? parseDate(ObjectCsv.COMPRA) : null;
    this.payment_date =      ObjectCsv.PAGO ? parseDate(ObjectCsv.PAGO) : null;
    this.description =       String(ObjectCsv.DETALLE || '').trim();
    this.amount =            ObjectCsv.MONTO_BRUTO ? Number(ObjectCsv.MONTO_BRUTO.replace(",", ".")) : 0;
    this.sign =              Math.sign(this.amount) || 0;
    this.atCreated =         dayjs()
    this.lastupdate =        dayjs()
    this.userupdate =        user ? user : "Admin"
  }
}

function  parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return dayjs(`${year}-${month}-${day}`);
}

export function transformDataArray(arrayOfObjects, TransformClass, user) {
  return arrayOfObjects.map(obj => new TransformClass(obj, user));
}