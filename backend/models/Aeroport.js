import mongoose from 'mongoose'

const AeroportSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  pays: {
    type: String,
    required: true,
  },
  ville: {
    type: String,
    required: true,
  }
},{ timestamps: true })
const Aeroport = mongoose.model('Aeroport', AeroportSchema);

export { Aeroport }