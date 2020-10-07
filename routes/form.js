const express = require('express')
const router = express.Router()
const FormData = require('form-data')
const fetch = require('node-fetch')
const dotenv = require('dotenv')

// Load config
dotenv.config({path: './config/config.env'});

// form data object
formData = new FormData()

// @desc forms page
// @route get /

router.get('/',(req,res,next) => {
  res.render('form1');
})

router.post('/check',(req,res,next) => {

  const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  const t1 = regex.test(String(req.body.Email_Address).toLowerCase());

  // console.log(t1)

  if(t1) {
    for (const key in req.body) {
      formData.append(key,req.body[key])
    }
    res.redirect('/next')
  } else {
    res.render('form1');
  }
  
})

router.get('/next',(req,res,next) => {
  res.render('form2')
})

router.post('/next',(req,res,next) => {

  for (const key in req.body) {
    formData.append(key,req.body[key])
  }

  
  fetch(process.env.SCRIPTURL, { method: 'POST', body: formData})
    .then(response => {
      // console.log('Success!',response)
        res.redirect('/thanku')
    })
    .catch(error => {
      console.error('Error!', error.message)
        res.render(error/500);
    })

})

router.get('/thanku',(req,res,next) => {
  res.render('thanku')
})

module.exports = router;