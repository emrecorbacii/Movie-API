const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//Models
const User=require('../models/User');
/* GET home page. */
router.get('/', (req, res, next)=> {
  res.send('AUTO DEPLOY FAİL TEST');
});

//Register
router.post('/register', (req, res, next)=> {
  const {username,password} = req.body;
  bcrypt.hash(password,5).then((hash)=>{
    const user=new User({
      username,
      password:hash
      
    });
    const promise= user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  });

});
//auth
router.post('/auth', (req, res, next)=> {
  const {username,password} = req.body;
  User.findOne({
    username
  },(err,user)=>{
    if (err)
        throw err;
    
    if (!user) {
      res.json({
        status:false,
        message:'user not found asdasdasdasd.'
      });
    }
    else{
      bcrypt.compare(password,user.password).then((data)=>{
        if(data!=true)
            res.json({
              status:false,
              message:'Yanlış şifre'
            });
        else{
            const payload={
              username
            };
            const token=jwt.sign(payload,req.app.get('api_secret_key'),{
            expiresIn:720 //12 saat
            });
            res.json({
              status:true,
              token
          });    
        }
     });    
    }
  });



});

module.exports = router;
