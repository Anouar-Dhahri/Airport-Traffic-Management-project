import { Anomalie } from './../models/Anomalie.js'

export const findAll = async (req, res, next) => {
  const anomalies = await Anomalie.find();
  res.json({
    success: true,
    anomalies: anomalies
  })
}

export const create = async(req, res, next) => {
  try {
    const { observation, factureId } = req.body;

    let anomalie = new Anomalie ({
      observation:observation, 
      factureId:factureId
    });
    anomalie.save()
    .then(()=> {
        res.json({
        success: true,
        message: "The Anomalie was created successfully."
        });
    }).catch(err => {
        res.json({
        success: false,
        message: `Cannot add This Anomalie.`
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
  const { observation } = req.body;
  await Anomalie.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          observation:observation
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The Anomalie was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update the Anomalie with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Anomalie.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The Anomalie was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the Anomalie with id=${id} !`
    })
  })
}