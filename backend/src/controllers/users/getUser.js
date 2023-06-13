'use strict';
const { getUserId } = require('../../database');

const getUser = async (req, res, next) =>{
    try {
        const { id } = req.params;

        const user = await getUserId(id);
        // console.log(id); 
        res.send({
            status: 'ok',
            info: user
        })
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getUser,
}