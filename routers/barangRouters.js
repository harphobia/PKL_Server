const express = require('express');
const router = express.Router()

const {index,getBarang,createbarang,updateBarang,deleteBarang} = require('../controllers/BarangControllers');


router.get('/',index)
router.get('/:id',getBarang)
router.post('/create',createbarang)
router.put('/update/:id',updateBarang)
router.delete('/delete/:id',deleteBarang)

module.exports = router