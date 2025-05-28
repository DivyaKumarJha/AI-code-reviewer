const express = require('express');
const router = express.Router();//this is to create a new router 
const aiController = require('../controllers/ai.controller');
router.post('/get-review', aiController.getReview); //this is to get the response from the ai controller

module.exports = router;