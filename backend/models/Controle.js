import mongoose from 'mongoose'

const ControleSchema = new mongoose.Schema({
  nbreLigneFacture: {
    type: String,
    required: true,
  },
  nbreLigneVol: {
    type: String,
    required: true,
  },
  factureId: {
    type: String,
    required: true,
  },
},{ timestamps: true})

const Controle = mongoose.model('Controle', ControleSchema);

export { Controle }