const express = require('express');
const router = express.Router()

const { create,remove,index,getUser, update, login, logout } = require('../controllers/UserControllers');

router.get('/', index)
router.get('/:id',getUser)
router.put('/update/:id', update)
router.post('/login', login)
router.post('/create',create)
router.delete('/delete/:id',remove)
router.delete('/logout/:id', logout)

module.exports = router