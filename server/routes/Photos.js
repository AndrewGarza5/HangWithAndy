const express = require('express')
const router = express.Router()

const {
    GetRandomPhoto
} = require('../controllers/Photos.js')

//without artis
router.route('/random-photo').get(GetRandomPhoto)

module.exports = router 