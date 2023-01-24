import { User } from './../models/User.js'
import { Aeroport } from './../models/Aeroport.js'
import { Contrat } from './../models/Contrat.js'
import { Anomalie } from './../models/Anomalie.js'
import { Avion } from './../models/Avion.js'
import { Facture } from './../models/Facture.js'
import { Reclamation } from './../models/Reclamation.js'
import { Trade } from './../models/Trade.js'
import { Vol } from './../models/Vol.js'

export const counter = async (req, res, next) => {
  const users = await User.find().count();
  const aeroport = await Aeroport.find().count();
  const contrats = await Contrat.find().count();
  const anomalies = await Anomalie.find().count();
  const avions = await Avion.find().count();
  const factures = await Facture.find().count();
  const controles = await Facture.find({ type: 'Controled'}).count();
  const valides = await Facture.find({ valide: true}).count();
  const reclamations = await Reclamation.find().count();
  const imports = await Trade.find({ type:'Import'}).count();
  const exports = await Trade.find({ type:'Export'}).count();
  const vols = await Vol.find().count();

  res.json({
    success: true,
    users: users,
    aeroport:aeroport,
    contrats: contrats,
    anomalies:anomalies,
    avions: avions,
    factures: factures,
    controles:controles,
    valides:valides,
    reclamations: reclamations,
    imports: imports,
    exports: exports,
    vols: vols
  })
}