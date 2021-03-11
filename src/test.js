const express = require('express');
const router = express.Router();
const moment = require('moment');
const { checkToken, createToken } = require('../src/services/token')


module.exports = router.get('/test', async (req, res) => {

    try{

        const user = {
            _id: 1
        }

        const token = createToken(user)

        const check = await checkToken(token)

        return res.status(200).send({
            Result: token,
            Token: check
        
        })

    }   
    catch (error) {
        console.log(error);
        return res.status(400).send({Error: error})
    }
    
})