const express = require('express');
const tasksController = require('./controllers/tasksController')
const router = express.Router();


router.get('/', tasksController.getAll);

module.exports = router;