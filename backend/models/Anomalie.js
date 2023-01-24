import mongoose from 'mongoose'

const AnomalieSchema = new mongoose.Schema({
  observation: {
    type: String,
    required: true,
  },
  factureId: {
    type: String,
    required: true,
  },
},{ timestamps: true})

const Anomalie = mongoose.model('Anomalie', AnomalieSchema);

export { Anomalie }