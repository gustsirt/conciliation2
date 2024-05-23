import { Schema, model } from "mongoose";

const workingSchema = Schema({
  filterT1: { type: Object, required: true },
  filterT2: { type: Object, required: true },
  comments:   String,                            // Comentarios
  isClosed:   Boolean,  
})

export default model('workingFile', workingSchema)