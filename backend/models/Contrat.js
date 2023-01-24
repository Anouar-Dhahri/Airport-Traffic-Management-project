import mongoose from 'mongoose'

const ContratSchema = new mongoose.Schema({
  aeroport: {
    type:String,
    required: true
  },
  dateValidationStart: {
    type:String,
    required: true
  },
  dateValidationEnd: {
    type:String,
    required: true
  },
  stationInfMor: {
    type:String,
    required: true
  },
  stationInfNig: {
    type:String,
    required: true
  },
  stationSupMor: {
    type:String,
    required: true
  }, 
  stationSupNig: {
    type:String,
    required: true
  }, 
  stationInAirHerbe: {
    type:String,
    required: true
  }, 
  securite: {
    type:String,
    required: true
  }, 
  passInter: {
    type:String,
    required: true
  },
  passNat: {
    type:String,
    required: true
  }, 
  balisage: {
    type:String,
    required: true
  }, 
  embInter: {
    type:String,
    required: true
  }, 
  embNat: {
    type:String,
    required: true
  }, 
  totalStationnement: {
    type:String,
    required: true
  }, 
  totalEmbarquement: {
    type:String,
    required: true
  }, 
  totalPasserelle: {
    type:String,
    required: true
  }, 
  totalBalisage:{
    type:String,
    required: true
  }, 
  totalSecurite: {
    type:String,
    required: true
  }
}, {timestamps: true})

const Contrat = mongoose.model('Contrat', ContratSchema)

export { Contrat }