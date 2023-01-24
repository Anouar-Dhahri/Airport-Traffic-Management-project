import mongoose from 'mongoose'

const TradeSchema = new mongoose.Schema({
  client: {
    type: String,
    required: true,
  },
  escale: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  tonnageTotal: {
    type: String,
    allowNull: true,
  },
  paysDepart: {
    type: String,
    required: true
  },
  paysArrivee:{
    type: String,
    required: true
  },
  dateEntree: {
    type: String,
    required: true
  },
  dateSortie: {
    type: String,
    required: true
  },
  heureEntree: {
    type: String,
    required: true
  },
  heureSortie: {
    type: String,
    required: true
  },
  prixService: {
    type: String,
    required: true
  },
  avions: {
    type: [],
    required: true
  },
  type: {
    type: String,
    required: true
  }
}, { timestamps: true })

const Trade = mongoose.model('Trade', TradeSchema)

export { Trade }