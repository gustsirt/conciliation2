import { Schema, model } from 'mongoose'

export const fileSchema = Schema({
  flag:               { type: String,  required: true }, // visa
  type:               { type: String,  required: true }, // c credito o d debito
  batch:              { type: Number,  required: true }, // lote
  number:             { type: Number,  required: true }, // comprobante
  card_plan:          { type: String,  required: true }, // 1 pago, debito, etc
  installment:        { type: Number,  required: true }, // cuotas
  origin_date:        { type: Date,    required: true,   default: Date() },
  id_client:          { type: String,                    default: "" },
  client:             { type: String,                    default: "" },
  amount:             { type: Number,  required: true },
  sign:               { type: Number,  required: true }, // + = 1 y - = -1
  atCreated:          { type: Date,                      default: Date() },
  lastupdate:         { type: Date,    required: true,   default: Date() },
  userupdate:         { type: String,  required: true,   default: "Admin" },
  idMeeting:          { type: Schema.Types.ObjectId, ref: 'data01'}, // id Tabla comparada
  meetings:           Number,                            // Cantidad encontrada
  error:              Number,                            // tipo de error
  isClosed:           Boolean,                           // Campo Cerrado
})

export default model('data02', fileSchema)