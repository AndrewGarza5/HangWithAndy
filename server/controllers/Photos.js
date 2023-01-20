const pool = require('../db/connect')
const crypto = require("crypto");
const e = require('express');

const GetRandomPhotoData = async (req, res) => {

    try{

        let query = await pool.query(
            "SELECT * FROM photos ORDER BY RANDOM() LIMIT 1"
        )
        
        const photoPath = process.env.GET_RANDOM_PHOTO_PATH + query.rows[0]['photoname']
        res.status(200).json(query.rows[0])
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

const GetPhoto = async (req, res) => {

    try{
        console.log(99)
        const photoPath = process.env.GET_RANDOM_PHOTO_PATH + req.params['photoname']
        res.status(200).sendFile(photoPath)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

module.exports = {
    GetRandomPhotoData,
    GetPhoto
}

