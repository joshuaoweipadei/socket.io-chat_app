const express = require('express');
const router = express.Router();
var fs = require('fs'); 

// routes
router.post('/login', login);
router.get('/', getAll);

module.exports = router;

function login(req, res){
  const { email, password } = req.body;
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    if(!err && data){
      var usersData = JSON.parse(data); 
      let user = usersData.find((user) => user.email === email && user.password === password); 
      
      if(user){
        return res.status(200).json(user)
      } else{
        return res.status(400).send({ message: "Incorrect email or password"})
      }

    } else{
      return res.status(400).send({ message: "Operation was not successful"})
    }
  });
}

function getAll(req, res){
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
    if(!err && data){
      var usersData = JSON.parse(data); 
      
      if(usersData){
        return res.status(200).json(usersData)
      } else{
        return res.status(400).send({ message: "Incorrect email or password"})
      }

    } else{
      return res.status(400).send({ message: "Operation was not successful"})
    }
  });
}