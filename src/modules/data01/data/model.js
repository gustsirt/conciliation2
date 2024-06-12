import { Schema, model } from 'mongoose'

export const fileSchema = new Schema({
  service:           { type: String, label: 'Servicio',       required: true, comments: 'Empresa proveedora', },
  business_number:   { type: String, label: 'N° de comercio', required: true, comments: '', },
  flag:              { type: String, label: 'Bandera',        required: true, comments: 'Ej: Visa' },
  type:              { type: String, label: 'Tipo',           required: true, comments: 'c (credito) o d (debito)', },
  batch:             { type: Number, label: 'Lote',           required: true, comments: '', },
  number:            { type: Number, label: 'Numero',         required: true, comments: '', },
  last_4_number:     { type: Number, label: 'Tarjeta',        required: true, comments: '', },
  installment:       { type: Number, label: 'Cuotas',         required: true, comments: '', },
  presentation_date: { type: Date,   label: 'F. Presentación',required: true, comments: '', },
  origin_date:       { type: Date,   label: 'F. de Origen',   required: true, comments: '', },
  payment_date:      { type: Date,   label: 'F. Pago',        required: true, comments: '', },
  payment_month:     { type: Number, label: 'Mes de pago',    required: true, comments: '', },
  description:       { type: String, label: 'Descripción',    required: true, comments: '', },
  amount:            { type: Number, label: 'Monto',          required: true, comments: '', },
  sign:              { type: Number, label: 'Signo',          required: true, comments: '+ = 1 y - = -1' },
  atCreated:         { type: Date,   label: 'F. Creación',                    comments: '', default: Date.now, },
  lastupdate:        { type: Date,   label: 'Actualización',  required: true, comments: '', default: Date.now,},
  userupdate:        { type: String, label: 'Usuario',        required: true, comments: '', default: "Admin",},
  idMeeting:         { type: Schema.Types.ObjectId, ref: 'data02',
                                     label: 'ID Coincidente',                 comments: '', },
  meetings:          { type: Number, label: 'Coincidencias',                  comments: 'Cantidad encontrada', },
  error:             { type: Number, label: 'Error',                          comments: 'Tipo de error', },
  isClosed:          { type: Boolean,label: 'Esta cerrado?',                  comments: 'Inhibe modificar', }
});

export default model('data01', fileSchema);