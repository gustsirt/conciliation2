import { Schema, model } from 'mongoose'

const thisSchema = new Schema({
  first_name:  { type: String, required: true },
  last_name:   { type: String, },
  email:       { type: String, required: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Debe completar un email valido'], unique: true },
  password:    { type: String, required: true },
  role:        { type: String, enum: ["user", "admin"], default: "user"},

  // data of conection
  created:     { type: Date,   default: Date.now,  immutable: true, },
  updated:     { type: Date,   default: Date.now,  },
  connection:  { type: Date,   default: Date.now,  },
}, {
  timestamps: {
    createdAt: 'created',
    updatedAt: 'updated'
  },
})

const dataModel = model('Users', thisSchema)

export default dataModel