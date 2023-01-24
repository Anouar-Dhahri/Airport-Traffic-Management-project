import { Facture } from './../models/Facture.js'

export const findAll = async (req, res, next) => {
  const factures = await Facture.find();
  res.json({
    success: true,
    factures: factures
  })
}

export const create = async(req, res, next) => {
  try {
    const { volId, montantHt, montantTtc } = req.body;

    let facture = new Facture ({
      volId:volId,
      montantHt:montantHt, 
      montantTtc:montantTtc
    });
    facture.save()
    .then(()=> {
        res.json({
        success: true,
        message: "The Bill was created successfully."
        });
    }).catch(err => {
        res.json({
        success: false,
        message: `Cannot add This Bill.`
        });
    });    
  } catch (error) {
    res.json({
      success: false,
      message: error
    });
  }
}

export const validate = async (req, res, next) => {
  const id = req.params.id;
  const { valide } = req.body;
  await Facture.findByIdAndUpdate(
    {_id: id},
    {
      $set:{
        valide: valide,
      }
    },
    { new: true }
  )  
  .then(() => {
    res.json({
      success: true,
      message: "Bill was updated successfully."
    });
  })
  .catch(err => {
    res.json({
      success: false,
      message: `Cannot update Bill with id=${id}.`
    });
  });
}

export const update = async (req, res, next) => {
  const id = req.params.id;
  const { volId, montantHt, montantTtc } = req.body;
  await Facture.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          volId: volId,
          montantHt:montantHt, 
          montantTtc:montantTtc
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "Bill was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update Bill with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Facture.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The Bill was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the bill with id=${id} !`
    })
  })
}