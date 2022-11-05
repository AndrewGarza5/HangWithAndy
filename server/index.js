const port = 5000 
const express = require('express')
const cors = require('cors')
const fs = require('fs')
require('dotenv').config()

const pool = require('./db/connect')

const app = express()
const https = require('https')
const http = require('http')

const { randomUUID } = require('crypto');
const crypto = require("crypto");

// HTTPS
// var httpsOptions = {
//     key: fs.readFileSync('/etc/letsencrypt/live/www.hangwithandy.com/privkey.pem'),
//     cert: fs.readFileSync('/etc/letsencrypt/live/www.hangwithandy.com/cert.pem'),
//     ca: fs.readFileSync('/etc/letsencrypt/live/www.hangwithandy.com/chain.pem')
// };
// const httpsServer = https.createServer(httpsOptions, app)

const httpServer = http.createServer(app)

// middleware 
app.use(cors())
app.use(express.json())

// routes
const HangOutRoute = require('./routes/HangOutRoute.js')

app.use('/api/v1/', HangOutRoute)

// test endpoint
app.get('/test', async (req,res) => {
    console.log('!!!')
    res.status(200).send('L + ratio')
})

// start server
const start = async () => {
    try{
        
        httpServer.listen(port,()=>{
            console.log(`HTTP server listening on port ${port}...`)
        })

        // httpsServer.listen(5000, ()=>{
        //     console.log('HTTPS server listening on port 5001...')
        // })

    }
    catch(error){
        console.log(error)
    }
}

start()