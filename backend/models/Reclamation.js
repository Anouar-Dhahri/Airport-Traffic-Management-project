import mongoose from 'mongoose'

const ReclamaionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  factureId: {
    type: String,
    required: true,
  },
}, { timestamps: true})
const Reclamation = mongoose.model('Reclamation', ReclamaionSchema);
export { Reclamation }