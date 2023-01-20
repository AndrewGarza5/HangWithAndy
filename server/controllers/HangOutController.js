const pool = require('../db/connect')
const crypto = require("crypto");
const e = require('express');



const SubmitHangout = async (req, res) => {

    try{
        if(
            req.body['name'] == null ||
            req.body['date'] == null ||
            req.body['phoneNumber'] == null ||
            req.body['whatDo'] == null ||
            req.body['inviteAnyone'] == null ||
            req.body['specificTime'] == null ||
            // req.body['whyHangout'] == null ||
            req.body['finalThoughts'] == null
        )
        {
            res.status(400).send({msg: 'One or more of the required fields is null'})
            return
        }

        const hangOutId = crypto.randomBytes(16).toString("hex")

        let query = await pool.query(
            "INSERT INTO HangOutSessions VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
            [
                hangOutId,
                req.body['name'].trim(),
                req.body['date'].trim(),
                req.body['phoneNumber'].trim(),
                req.body['whatDo'].trim(),
                req.body['inviteAnyone'].trim(),
                req.body['specificTime'].trim(),
                // req.body['whyHangout'].trim(),
                req.body['finalThoughts'].trim()


            ]
        )
        console.log(req.body)

        res.status(200).json({fart: 'ed'})
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

const GetAllHangouts = async (req, res) => {

    try{

        let query = await pool.query(
            "SELECT * FROM HangOutSessions"
        )

        console.log(query.rows)
        res.status(200).json(query.rows)
    }
    catch(error){
        res.status(500).json({msg: error.toString()})
    }
    
}

module.exports = {
    SubmitHangout,
    GetAllHangouts
}

