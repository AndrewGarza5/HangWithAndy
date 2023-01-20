const express = require('express')
const router = express.Router()

const {
    GetPhoto, 
    GetRandomPhotoData
} = require('../controllers/Photos.js')

//without artis
router.route('/random-photo-data').get(GetRandomPhotoData)
router.route('/photo/:photoname').get(GetPhoto)

module.exports = router 