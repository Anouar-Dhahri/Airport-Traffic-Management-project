import { Vol } from './../models/Vol.js'

export const findAll = async (req, res, next) => {
  const vols = await Vol.find();
  res.json({
    success: true,
    vols: vols
  })
}

export const create = async(req, res, next) => {
  try {
    const { dateVol, companie, dateDepart, dateArrivee, heureAtterissage, heureDecollage, escaleDepart, escaleArrivee, typeEscale, typeVol, prixService, avions } = req.body;
    let vol = new Vol ({
      dateVol:dateVol,
      companie:companie,
      dateDepart:dateDepart,
      dateArrivee:dateArrivee,
      heureAtterissage: heureAtterissage,
      heureDecollage:heureDecollage,
      escaleDepart:escaleDepart,
      escaleArrivee:escaleArrivee,
      typeEscale:typeEscale,
      typeVol:typeVol,
      prixService:prixService,
      avions:avions
    });
    await vol.save()
    .then(()=> {
      res.json({
        success: true,
        message: "The flight was created successfully."
      });
    }).catch(err => {
      res.json({
        success: false,
        message: err   //`Cannot add This flight.`
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
  const { dateVol, companie, dateDepart, dateArrivee, heureAtterissage, heureDecollage, escaleDepart, escaleArrivee, typeEscale, typeVol, prixService, avions } = req.body;
  await Vol.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          dateVol:dateVol,
          companie:companie,
          dateDepart:dateDepart,
          dateArrivee:dateArrivee,
          heureAtterissage: heureAtterissage,
          heureDecollage:heureDecollage,
          escaleDepart:escaleDepart,
          escaleArrivee:escaleArrivee,
          typeEscale:typeEscale,
          typeVol:typeVol,
          prixService:prixService,
          avions:avions
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The flight was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update the flight with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Vol.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The flight was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the flight with id=${id} !`
    })
  })
}