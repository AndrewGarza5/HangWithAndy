const pool = require('../db/connect')
const crypto = require("crypto");
const e = require('express');

const GetRandomPhoto = async (req, res) => {

    try{

        let query = await pool.query(
            "SELECT photoname FROM photos ORDER BY RANDOM() LIMIT 1"
        )

        const photoPath = 'C:/Users/Andy/Desktop/Programming/HangWithAndy/server/photos/' + query.rows[0]['photoname']
        //const photoPath =  '/home/ubuntu/server/photos/' + query.rows[0]['photoname']

        res.status(200).download(photoPath)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

module.exports = {
    GetRandomPhoto
}

