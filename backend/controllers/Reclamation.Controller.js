import { Reclamation } from './../models/Reclamation.js'

export const findAll = async (req, res, next) => {
  const reclamations = await Reclamation.find();
  res.json({
    success: true,
    reclamations: reclamations
  })
}

export const create = async(req, res, next) => {
  try {
    const { description, factureId } = req.body;

    let reclamation = new Reclamation ({
      description:description, 
      factureId:factureId
    });
    reclamation.save()
    .then(()=> {
        res.json({
        success: true,
        message: "The complaint was created successfully."
        });
    }).catch(err => {
        res.json({
        success: false,
        message: `Cannot add This complaint.`
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
  const { description, factureId } = req.body;
  await Reclamation.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          description:description, 
          factureId:factureId
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The Complaint was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update the Complaint with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Reclamation.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The Complaint was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the Complaint with id=${id} !`
    })
  })
}