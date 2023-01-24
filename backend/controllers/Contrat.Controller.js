import { Contrat } from './../models/Contrat.js'

export const findAll = async (req, res, next) => {
  const contrats = await Contrat.find();
  res.json({
    success: true,
    contrats: contrats
  })
}

export const create = async(req, res, next) => {
  try {
    const {
      aeroport,
      dateValidationStart,
      dateValidationEnd,
      stationInfMor,
      stationInfNig,
      stationSupMor, 
      stationSupNig, 
      stationInAirHerbe, 
      securite, 
      passInter,
      passNat, 
      balisage, 
      embInter, 
      embNat, 
      totalStationnement, 
      totalEmbarquement, 
      totalPasserelle, 
      totalBalisage, 
      totalSecurite
     } = req.body;
     console.log(req.body)
    let contract = new Contrat ({
      aeroport: aeroport,
      dateValidationStart : dateValidationStart,
      dateValidationEnd :dateValidationEnd ,
      stationInfMor : stationInfMor,
      stationInfNig : stationInfNig,
      stationSupMor : stationSupMor, 
      stationSupNig : stationSupNig , 
      stationInAirHerbe : stationInAirHerbe, 
      securite : securite, 
      passInter : passInter,
      passNat : passNat, 
      balisage : balisage, 
      embInter : embInter, 
      embNat : embNat, 
      totalStationnement : totalStationnement, 
      totalEmbarquement : totalEmbarquement, 
      totalPasserelle : totalPasserelle , 
      totalBalisage : totalBalisage, 
      totalSecurite : totalSecurite
    });

    contract.save()
    .then(()=> {
      res.json({
        success: true,
        message: "The Contract was created successfully."
      });
    }).catch(err => {
      res.json({
        success: false,
        message: `Cannot add This Contract.`
      });
    });    
  } catch (error) {
    res.json({
      success: false,
      message: error
    });
  }
}

export const update = async (req, res, next) => {
  const id = req.params.id;
  const {
    aeroport,
    dateValidationStart,
    dateValidationEnd,
    stationInfMor,
    stationInfNig,
    stationSupMor, 
    stationSupNig, 
    stationInAirHerbe, 
    securite, 
    passInter,
    passNat, 
    balisage, 
    embInter, 
    embNat, 
    totalStationnement, 
    totalEmbarquement, 
    totalPasserelle, 
    totalBalisage, 
    totalSecurite
  } = req.body;

  await Contrat.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          aeroport: aeroport,
          dateValidationStart : dateValidationStart,
          dateValidationEnd :dateValidationEnd ,     
          stationInfMor : stationInfMor,
          stationInfNig : stationInfNig,
          stationSupMor : stationSupMor, 
          stationSupNig : stationSupNig , 
          stationInAirHerbe : stationInAirHerbe, 
          securite : securite, 
          passInter : passInter,
          passNat : passNat, 
          balisage : balisage, 
          embInter : embInter, 
          embNat : embNat, 
          totalStationnement : totalStationnement, 
          totalEmbarquement : totalEmbarquement, 
          totalPasserelle : totalPasserelle , 
          totalBalisage : totalBalisage, 
          totalSecurite : totalSecurite
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "Contract was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update Contract with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Contrat.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The Contract was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete Contract with id=${id} !`
    })
  })
}