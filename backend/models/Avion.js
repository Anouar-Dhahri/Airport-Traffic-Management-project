import mongoose from 'mongoose'

const AvionSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  tonnage: {
    type: String,
    required: true,
  },
  nbrPassInter: {
    type: String,
    required: true,
  },
  nbrPassNatio: {
    type: String,
    required: true,
  },
}, { timestamps: true })

const Avion = mongoose.model('Avion', AvionSchema);
export { Avion }