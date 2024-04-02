import dayjs from "dayjs"

const mapFlag = {
  "MASTERCARD": "master",
  "VISA": "visa",
  "VISA ": "visa",
};

const mapType = {
  "MASTERCARD": "c",
  "MASTERCARD DEBITO": "d",
  "VISA": "c",
  "VISA DEBITO": "d"
};


export default class TransformOriginData {
  constructor(dataFile, user = undefined) {
    this.flag =               mapFlag[dataFile.Tarjeta?.toUpperCase()] || '';
    this.type =               String(dataFile["Plan Tarjeta"]).includes("DEBITO") ? "d" : "c";
    const codeCupon = Number(dataFile["Número Cupón"].replace(/\./g, ''));
    this.batch =              Math.trunc(codeCupon / 10000);
    this.number =             codeCupon % 10000;
    this.card_plan =          dataFile["Plan Tarjeta"] || '';
    this.installment =        dataFile.Cuotas;
    this.origin_date =        dataFile["Fecha Ingreso"] ? parseDate(dataFile["Fecha Ingreso"]) : null;
    this.id_client =          dataFile.Documento || '';
    this.client =             dataFile["Nombre del Cliente"] || '';
    this.amount =             parseFloat(dataFile["Monto Cuota"]) || 0;
    this.sign =               Math.sign(this.amount) || 0;
    this.atCreated =          dayjs();
    this.lastupdate =         dayjs();
    this.userupdate =         user ? user : "Admin";
  }
}

function  parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  return dayjs(`${year}-${month}-${day}`);
}