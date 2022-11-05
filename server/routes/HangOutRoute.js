const express = require('express')
const router = express.Router()

const {
    SubmitHangout,
    GetAllHangouts
} = require('../controllers/HangOutController.js')

//without artis
router.route('/hang-out').post(SubmitHangout)
router.route('/hang-out').get(GetAllHangouts)

module.exports = router 