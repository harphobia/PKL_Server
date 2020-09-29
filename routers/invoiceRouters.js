const express = require('express');
const router = express.Router()

const { view, remove } = require('../controllers/InvoiceControllers');

router.get('/view/:id', view)
router.delete('/delete/:id', remove)

module.exports = router