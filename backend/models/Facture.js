import mongoose from 'mongoose'

const FactureSchema = new mongoose.Schema({
  volId:{
    type: String,
    required: true,
  },
  montantHt:{
    type: String,
    required: true,
  },
  montantTtc:{
    type: String,
    required: true,
  },
  valide: {
    type:Boolean,
    default: false
  },
  type: {
    type: String,
    default:'Not Controled'
  }
}, { timestamps: true })

const Facture = mongoose.model('Facture', FactureSchema);

export { Facture }