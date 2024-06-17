import { Schema, model } from 'mongoose'

export const fileSchema = Schema({
  flag:              { type: String, label: 'Bandera',      required: true, comments: 'Ej: Visa',
    enum: ['visa', 'master', 'naranjax', 'mercadopago', 'cabal'],  },
  type:              { type: String, label: 'Tipo',         required: true, enum: ['c', 'd'], comments: 'c (credito) o d (debito)' },
  batch:             { type: Number, label: 'Lote',         required: true, },
  number:            { type: Number, label: 'Número',       required: true, },
  card_plan:         { type: String, label: 'Plan',         required: true, comments: '1 pago, débito, etc.' },
  installment:       { type: Number, label: 'Cuotas',       required: true, },
  origin_date:       { type: Date,   label: 'F. de Origen', required: true, default: Date(), },
  id_client:         { type: String, label: 'DNI',                          default: "", },
  client:            { type: String, label: 'Cliente',                      default: "", },
  amount:            { type: Number, label: 'Monto',        required: true, },
  sign:              { type: Number, label: 'Signo',        required: true, enum: [1, -1], comments: '+ = 1 y - = -1' },
  atCreated:         { type: Date,   label: 'F. Creación',                  default: Date.now, disabled: true, },
  lastupdate:        { type: Date,   label: 'Actualización',                default: Date.now, disabled: true, },
  userupdate:        { type: String, label: 'Usuario',                      default: "Admin",  disabled: true, },
  idMeeting:         { type: Schema.Types.ObjectId, ref: 'data01',
                                      label: 'ID Coincidente', },
  meetings:          { type: Number, label: 'Coincidencias',                comments: 'Cantidad encontrada' },
  payment_date:      { type: Date,   label: 'Fecha de Pago',                comments: 'Fecha de pago' },
  error:             { type: Number, label: 'Error',                        comments: 'Tipo de error' },
  isClosed:          { type: Boolean,label: 'Está cerrado?',                comments: 'Inhibe modificar' }
})

export default model('data02', fileSchema)