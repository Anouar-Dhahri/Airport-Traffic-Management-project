import { Trade } from './../models/Trade.js'

export const findAll = async (req, res, next) => {
  const imports = await Trade.find({ type:'Import'});
  const exports = await Trade.find({ type:'Export'});
  res.json({
    success: true,
    imports: imports,
    exports: exports
  })
}

export const create = async(req, res, next) => {
  try {
    const {
      client,
      escale,
      designation,
      tonnageTotal,
      paysDepart,
      paysArrivee, 
      dateEntree,
      dateSortie,
      heureEntree,
      heureSortie,
      prixService, 
      avions, 
      type
     } = req.body;
     console.log(req.body)
    let trade = new Trade ({
      client: client,
      escale : escale,
      designation :designation ,
      tonnageTotal : tonnageTotal,
      paysDepart : paysDepart,
      paysArrivee : paysArrivee, 
      dateEntree : dateEntree,
      dateSortie : dateSortie,
      heureEntree : heureEntree,
      heureSortie : heureSortie,
      prixService : prixService , 
      avions: avions,
      type: type
    });

    trade.save()
    .then(()=> {
      res.json({
        success: true,
        message: "The Trade was created successfully."
      });
    }).catch(err => {
      res.json({
        success: false,
        message: `Cannot add This Trade.`
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
    client,
    escale,
    designation,
    tonnageTotal,
    paysDepart,
    paysArrivee, 
    dateEntree,
    dateSortie,
    heureEntree,
    heureSortie,
    prixService, 
    avions, 
    type
  } = req.body;

  await Trade.findByIdAndUpdate(
      {_id: id},
      {
        $set:{
          client: client,
          escale : escale,
          designation :designation ,
          tonnageTotal : tonnageTotal,
          paysDepart : paysDepart,
          paysArrivee : paysArrivee, 
          dateEntree : dateEntree,
          dateSortie : dateSortie,
          heureEntree : heureEntree,
          heureSortie : heureSortie,
          prixService : prixService , 
          avions: avions,
          type: type
        }
      },
      { new: true }
    )  
    .then(() => {
      res.json({
        success: true,
        message: "The Trade was updated successfully."
      });
    })
    .catch(err => {
      res.json({
        success: false,
        message: `Cannot update Trade with id=${id}.`
      });
    });
}

export const remove = async (req, res, next) => {
  const id = req.params.id;
  await Trade.deleteOne({ _id: id})
  .then(() => {
    res.json({
      success: true,
      message: "The Trade was deleted successfully !"
    })
  }).catch((err) => {
    res.json({
      success: false,
      message: `Cannot delete Trade with id=${id} !`
    })
  })
}