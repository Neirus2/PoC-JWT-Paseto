const { Router } = require('express');
const router = Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { paseto } = require('paseto');


module.exports = router;

module.exports.verifyToken = verifyToken;


  router.post('/login', async(req, res) => {

      const { email, password } = req.body;
      const user = await User.findOne({email})
      if (!user) return res.status(401).send("Email no existe");
      if (password !== user.password) return res.status(401).send("Contraseña Incorrecta");
      const pasetoToken = await paseto.sign({ _id: user._id, role: user.role},'secretKey');
      res.status(200).json({ pasetoToken });
      console.log(pasetoToken);

  });

function verifyToken (req, res, next) {
    if(!req.headers.authorization) {
        return res.status(401).send(" Unauthorized request ")
    }

    const token = req.headers.authorization.split(' ')[1]
    if (token  === 'null') {
        return res.status(401).send(" Unauthorized request ") 
    } 

    const payload = jwt.verify(token, 'secretKey')
    req.userId = payload._id
    next();
}  
