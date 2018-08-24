const express = require('express');
const router = express.Router();
//Models
const Movie=require('../models/Movie');

//------------------------------------------------------------------------------------
//Film ekleme
router.post('/', (req, res, next)=> {
  //const {title,category,country,year,date,imdb_score}=req.body;

  const movie= new Movie(req.body);    
  const promise= movie.save();

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
});

//Bütün filmleri listeleme
router.get('/',(req,res,next)=>{
  const promise= Movie.find({ });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
});

//Top 10 filmleri listeleme
router.get('/top10',(req,res,next)=>{
  const promise= Movie.find({ }).limit(10).sort({imdb_score: -1});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
});

//Id'ye göre listeleme
router.get('/:movie_id',(req,res,next)=>{
  const promise=Movie.findById(req.params.movie_id);

  promise.then((data) => {
    if(!data)
      next({message:'bulunamadı id yi kontrol edin.',code:33});
    else  
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//Id ye göre Update
router.put('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndUpdate(
    req.params.movie_id, //film'in id si
    req.body,           // değişecek olan şey veya şeyler.
    {
      new:true
    }             
  ); 

  promise.then((data) => {
    if(!data)
      next({message:'bulunamadı id yi kontrol edin.',code:33});
    else  
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//Id ye göre delete
router.delete('/:movie_id',(req,res,next)=>{
  const promise=Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((data) => {
    if(!data)
      next({message:'bulunamadı id yi kontrol edin.',code:33});
    else  
    res.json({status :1});
  }).catch((err) => {
    res.json(err);
  });
});

// Between 
router.get('/between/:start_year/:end_year',(req,res,next)=>{
  const { start_year,end_year }= req.params;

  const promise= Movie.find({ 
    year:{"$gte":parseInt(start_year),
          "$lte":parseInt(end_year),
          }
  });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err)
  })
});


module.exports = router;
