const express = require('express');
const router = express.Router()

const { index, view, remove } = require('../controllers/TransControllers');

router.get('/', index)
router.get('/view/:id', view)
router.delete('/delete/:id', remove)

module.exports = router