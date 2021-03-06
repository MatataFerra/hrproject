const { Schools } = require('../../database/tables');
const express = require('express');
const router = express.Router();

module.exports = router.get('/', async (req, res) => {
    
    try {
        const schools = await Schools.findAll({
            order: [
                ['district', 'ASC']
            ]
        });

        return res.status(200).send({Escuelas: schools});

    } catch (error) {
        console.log(error);
        return res.send({Error: error})
    }


});