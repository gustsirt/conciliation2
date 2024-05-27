import { Schema, model } from 'mongoose'

export const fileSchema = Schema({
  service:            { type: String,  required: true }, // empresa proveedora
  flag:               { type: String,  required: true }, // visa
  type:               { type: String,  required: true }, // c credito o d debito
  business_number:    { type: String,  required: true }, // n comercio
  batch:              { type: Number,  required: true }, // lote
  number:             { type: Number,  required: true }, // comprobante
  last_4_number:      { type: Number,  required: true },
  installment:        { type: Number,  required: true }, // cuotas
  presentation_date:  { type: Date,    required: true },
  origin_date:        { type: Date,    required: true },
  payment_date:       { type: Date,    required: true },
  payment_month:      { type: Number,  required: true },
  description:        { type: String,  required: true },
  amount:             { type: Number,  required: true },
  sign:               { type: Number,  required: true }, // + = 1 y - = -1
  atCreated:          { type: Date,                      default: Date() },
  lastupdate:         { type: Date,    required: true,   default: Date() },
  userupdate:         { type: String,  required: true,   default: "Admin" },
  idMeeting:          { type: Schema.Types.ObjectId, ref: 'data02'}, 
  meetings:           Number,                            // Cantidad encontrada
  error:              Number,                            // tipo de error
  isClosed:           Boolean,                           // Campo Cerrado
})

export default model('data01', fileSchema)