const express = require('express')
const router = express.Router()

const {
    GetPhoto, 
    GetRandomPhotoData,
    GetRandomPhotoList
} = require('../controllers/Photos.js')

//without artis
router.route('/random-photo-list').get(GetRandomPhotoList)
router.route('/random-photo-data').get(GetRandomPhotoData)
router.route('/photo/:photoname').get(GetPhoto)

module.exports = router 