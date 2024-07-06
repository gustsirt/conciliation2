import { Schema, model } from 'mongoose'

export const fileSchema = new Schema({
  service:           { type: String, label: 'Servicio',       required: true, enum: ['Prisma', 'Payway', 'MercadoPago'], comments: 'Empresa proveedora', },
  business_number:   { type: String, label: 'N° de comercio', required: true, },
  flag:              { type: String, label: 'Bandera',        required: true, enum: ['visa', 'master', 'naranjax', 'mercadopago', 'cabal'], comments: 'Ej: Visa' },
  type:              { type: String, label: 'Tipo',           required: true, enum: ['c', 'd'], comments: 'c (credito) o d (debito)', },
  batch:             { type: Number, label: 'Lote',           required: true, },
  number:            { type: Number, label: 'Numero',         required: true, },
  last_4_number:     { type: Number, label: 'Tarjeta',        required: true, match: /^\d{1,4}$/},
  installment:       { type: Number, label: 'Cuotas',         required: true, },
  presentation_date: { type: Date,   label: 'F. Presentación',required: true, },
  origin_date:       { type: Date,   label: 'F. de Origen',   required: true, },
  payment_date:      { type: Date,   label: 'F. Pago',        required: true, },
  payment_month:     { type: Number, label: 'Mes de pago',    required: true, enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],},
  description:       { type: String, label: 'Descripción',    required: true, },
  amount:            { type: Number, label: 'Monto',          required: true, },
  sign:              { type: Number, label: 'Signo',          required: true, enum: [1, -1], comments: '+ = 1 y - = -1' },
  atCreated:         { type: Date,   label: 'F. Creación',                    default: Date.now, disabled: true},
  lastupdate:        { type: Date,   label: 'Actualización',                  default: Date.now, disabled: true},
  userupdate:        { type: String, label: 'Usuario',                        default: "Admin",  disabled: true},
  idMeeting:         { type: Schema.Types.ObjectId, ref: 'data02',
                                    label: 'ID Coincidente',                 },
  meetings:          { type: Number, label: 'Coincidencias',                  comments: 'Cantidad encontrada', },
  error:             { type: Number, label: 'Error',                          comments: 'Tipo de error', },
  isClosed:          { type: Boolean,label: 'Esta cerrado?',                  comments: 'Inhibe modificar', }
});

export default model('data01', fileSchema);