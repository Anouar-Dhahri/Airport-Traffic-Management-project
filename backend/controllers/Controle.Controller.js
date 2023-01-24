import { Controle } from './../models/Controle.js'
import { Facture } from './../models/Facture.js'

export const findAll = async (req, res, next) => {
  const controles = await Controle.find();
  res.json({
    success: true,
    controles: controles
  })
}

export const create = async(req, res, next) => {
  try {
    const { nbreLigneFacture,nbreLigneVol, factureId } = req.body;
    await Controle.find({factureId:factureId})
    .then((result) => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "Bill aleady Controled !"
        });
      }else {
        Facture.findByIdAndUpdate(
          {_id: factureId},
          {
            $set:{
              type: 'Controled'
            }
          },
          { new: true }
        )  
        .then(() => {
          let controle = new Controle ({
            nbreLigneFacture:nbreLigneFacture, 
            nbreLigneVol:nbreLigneVol,
            factureId:factureId
          });
          controle.save()
          .then(()=> {
              res.json({
              success: true,
              message: "The data saved successfully."
              });
          }).catch(err => {
              res.json({
              success: false,
              message: `Cannot add This data.`
              });
          });    
        })
        .catch(err => {
          res.json({
            success: false,
            message: `Cannot update Bill with id=${id}.`
          });
        });
      }
    })

  } catch (error) {
    res.json({
      success: false,
      message: error
    });
  }
}

export const update = async (req, res, next) => {
  const id = req.params.id;
  const { nbreLigneFacture,nbreLigneVol } = req.body;

  await Controle.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          nbreLigneFacture:nbreLigneFacture, 
          nbreLigneVol:nbreLigneVol
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The data was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update the data with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Controle.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The data was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the data with id=${id} !`
    })
  })
}