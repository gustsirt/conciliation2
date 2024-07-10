import { Schema, model } from 'mongoose'
import { FLAGS, NUMBER_SIGNS, TYPE_CARDS } from '../../valueList.js'

export const fileSchema = Schema({
  flag:              { type: String, required: true, enum: FLAGS,  },
  type:              { type: String, required: true, enum: TYPE_CARDS,  },
  batch:             { type: Number, required: true, },
  number:            { type: Number, required: true, },
  card_plan:         { type: String, required: true, comments: '1 pago, débito, etc.' },
  installment:       { type: Number, required: true, },
  origin_date:       { type: Date,   required: true, default: Date(), },
  id_client:         { type: String, default: "", },
  client:            { type: String, default: "", },
  amount:            { type: Number, required: true, },
  sign:              { type: Number, required: true, enum: NUMBER_SIGNS, },
  created:           { type: Date,   default: Date.now, disabled: true, },
  updated:           { type: Date,   default: Date.now, disabled: true, },
  userupdate:        { type: String, default: "Admin",  disabled: true, },
  idMeeting:         { type: Schema.Types.ObjectId, ref: 'data01',      },
  meetings:          { type: Number,  },
  payment_date:      { type: Date,    },
  error:             { type: Number,  },
  isClosed:          { type: Boolean, }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

export default model('data02', fileSchema)