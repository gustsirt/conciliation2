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


export default class TransformOriginData {
  constructor(dataFile, user = undefined) {
    this.service =           "Prisma"
    this.flag =              mapFlag[dataFile.MARCA?.toUpperCase()] || '';
    this.type =              mapType[dataFile.MARCA?.toUpperCase()] || '';
    this.business_number =   dataFile.ESTABLECIMIENTO || '';
    this.batch =             Number(dataFile.LOTE) || 0;
    this.number =            Number(dataFile["NUM.CUPON"]) || 0;
    this.last_4_number =     dataFile["NUM.TARJETA"] ? Number(dataFile["NUM.TARJETA"].slice(-4)) : '';
    this.installment =       Number(dataFile["CANT.CUOTAS"]) || 0;
    this.presentation_date = dataFile.PRESENTACION ? parseDate(dataFile.PRESENTACION) : null;
    this.origin_date =       dataFile.COMPRA ? parseDate(dataFile.COMPRA) : null;
    this.payment_date =      dataFile.PAGO ? parseDate(dataFile.PAGO) : null;
    this.payment_month =     this.payment_date.month() +1 ;
    this.description =       String(dataFile.DETALLE || '').trim();
    this.amount =            dataFile.MONTO_BRUTO ? Number(dataFile.MONTO_BRUTO.replace(",", ".")) : 0;
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