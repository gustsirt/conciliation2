import { Schema, model } from "mongoose";

const workingSchema = Schema({
  filterT1: { type: Object },
  filterT2: { type: Object },
  comments:   String,                            // Comentarios
  isClosed:   Boolean,  
})

export default model('workingFile', workingSchema)