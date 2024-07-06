import { Schema, model } from 'mongoose'

const usersSchema = new Schema({
  first_name: {    type: String, label: "Nombre",          required: true },
  last_name:  {    type: String, label: "Apellido", },
  email:      {    type: String, label: "Email",           required: true, unique: true },
  password:   {    type: String, label: "Contraseña",      required: true },
  role:       {    type: String, label: "Rol",                             enum: ["user", "admin"], default: "user"},
  lastupdated:{    type: Date,   label: 'Actualización',                   default: Date.now},
  lastconnection:{ type: Date,   label: 'Ultima conexión',                 default: Date.now},
})

export default model('users', usersSchema)