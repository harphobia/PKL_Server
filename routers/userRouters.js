const express = require('express');
const router = express.Router()

const { index, update, login, logout } = require('../controllers/UserControllers');

router.get('/', index)
router.put('/update/:id', update)
router.post('/login', login)
router.purge('/logout', logout)

module.exports = router