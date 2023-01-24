import { Aeroport } from './../models/Aeroport.js'

export const findAll = async (req, res, next) => {
  const aeroports = await Aeroport.find();
  res.json({
    success: true,
    aeroports: aeroports
  })
}

export const create = async(req, res, next) => {
  try {
    const { nom, pays, ville } = req.body;
    await Aeroport.find({nom:nom, pays: pays, ville: ville})
    .then(result => {
      if(result.length >=1) {
        res.json({
          success: false,
          message: "Airport already exist !"
        });
      }else {
        let aeroport = new Aeroport ({
          nom:nom, 
          pays:pays,
          ville:ville, 
        });
        aeroport.save()
        .then(()=> {
          res.json({
            success: true,
            message: "The Airport was created successfully."
          });
        }).catch(err => {
          res.json({
            success: false,
            message: `Cannot add This Airport.`
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
  const { nom, pays, ville } = req.body;
  await Aeroport.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          nom:nom, 
          pays:pays,
          ville:ville, 
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "Airport was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update Airport with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Aeroport.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The airport was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete the airport with id=${id} !`
    })
  })
}