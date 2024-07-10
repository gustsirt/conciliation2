import { Schema, model } from 'mongoose'
import { FLAGS, MONTHS, NUMBER_SIGNS, SERVICES, TYPE_CARDS } from '../../valueList.js';

export const fileSchema = new Schema({
  service:           { type: String, required: true, enum: SERVICES, },
  business_number:   { type: String, required: true, },
  flag:              { type: String, required: true, enum: FLAGS,  },
  type:              { type: String, required: true, enum: TYPE_CARDS, },
  batch:             { type: Number, required: true, },
  number:            { type: Number, required: true, },
  last_4_number:     { type: Number, required: true, match: /^\d{1,4}$/},
  installment:       { type: Number, required: true, },
  presentation_date: { type: Date,   required: true, },
  origin_date:       { type: Date,   required: true, },
  payment_date:      { type: Date,   required: true, },
  payment_month:     { type: Number, required: true, enum: MONTHS,},
  description:       { type: String, required: true, },
  amount:            { type: Number, required: true, },
  sign:              { type: Number, required: true, enum: NUMBER_SIGNS, },
  created:           { type: Date,   default: Date.now, },
  updated:           { type: Date,   default: Date.now, },
  userupdate:        { type: String, default: "Admin",  },
  idMeeting:         { type: Schema.Types.ObjectId, ref: 'data02', },
  meetings:          { type: Number,  },
  error:             { type: Number,  },
  isClosed:          { type: Boolean, }
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
});

export default model('data01', fileSchema);