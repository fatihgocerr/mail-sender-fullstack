const nodemailer = require('nodemailer');
require('dotenv').config();
const express = require('express');
const app = express();
const router = express.Router();


const fileUpload = require('./fileUpload');
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.USER_MAIL,
    pass: process.env.USER_PASSWORD
  }
})

app.use( function (req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', '*');
  next();
})


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.post("/fileUpload",(req,res,next)=>{
  try {
    fileUpload(req, res, function(error) {
      if (error) {
        console.log("err",error)
        res.status(400).json({error: error})
      } else {
        console.log("req.file",req.file)
        return res.json(req.file).status(200)
      }
    })
  } catch (error) {
    console.log("error",error)
    return res.status(500).json({error: error})
  }
})

router.post('/sendMail', (req, res) => {
  const {to, subject, text, file} = req.body;
  // console.log(to, subject, text,file);
  // console.log(path.join(__dirname, 'uploads', 'image-'+file  ));
  if (!to || !subject || !text) {
    return res.status(400).json({message: 'All fields are required'})
  } else {
    transporter.sendMail({
      from: process.env.USER_MAIL,
      to,
      subject,
      text,
      attachments: [{
        filename: 'image-'+file,
        path: path.join(__dirname, 'uploads', 'image-'+file  )
      }]
    }, (err, info) => {
      if (err) {
        // console.log(err);
        return res.status(500).json({message: 'Server error'})
      } else {
        console.log(info);
        return res.status(200).json({message: 'Message sent'})
      }
    })
  }

})


app.use(express.json());
app.use(router)
app.listen(5000, () => {
  console.log('Server is running on port 5000');

})

