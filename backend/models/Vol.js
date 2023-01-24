import mongoose from 'mongoose'

const VolSchema = new mongoose.Schema({
  dateVol: {
    type: String,
    required: true,
  },
  companie: {
    type: String,
    required: true,
  },
  dateDepart: {
    type: String,
    required: true,
  },
  dateArrivee: {
    type: String,
    allowNull: true,
  },
  heureAtterissage: {
    type: String,
    required: true
  },
  heureDecollage:{
    type: String,
    required: true
  },
  escaleDepart:{
    type: String,
    required: true
  },
  escaleArrivee:{
    type: String,
    required: true
  },
  typeEscale: {
    type: String,
    required: true
  },
  typeVol: {
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
  }
}, { timestamps: true })

const Vol = mongoose.model('Vol', VolSchema)

export { Vol }