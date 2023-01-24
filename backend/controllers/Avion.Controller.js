import { Avion } from './../models/Avion.js'

export const findAll = async (req, res, next) => {
  const avions = await Avion.find();
  res.json({
    success: true,
    avions: avions
  })
}

export const create = async(req, res, next) => {
  try {
    const { nom, type, tonnage, nbrPassInter, nbrPassNatio } = req.body;
    let avion = new Avion ({
      nom: nom,
      type:type, 
      tonnage:tonnage,
      nbrPassInter:nbrPassInter, 
      nbrPassNatio:nbrPassNatio
    });
    await avion.save()
    .then(()=> {
      res.json({
        success: true,
        message: "The Plane was created successfully."
      });
    }).catch(err => {
      res.json({
        success: false,
        message: `Cannot add This Plane.`
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
  const { nom, type, tonnage, nbrPassInter, nbrPassNatio } = req.body;
  await Avion.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          nom:nom,
          type:type, 
          tonnage:tonnage,
          nbrPassInter:nbrPassInter, 
          nbrPassNatio:nbrPassNatio
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The Plane was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update the Plane with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Avion.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "Plane was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the Plane with id=${id} !`
    })
  })
}