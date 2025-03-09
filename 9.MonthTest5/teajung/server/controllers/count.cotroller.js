require('dotenv').config();
const sequelize = require('../models/index');

const getCount = async (req, res) =>{
    try{
        const response = await sequelize.models.Count.findAll({
            order: [['id', 'DESC'],['createdAt', 'DESC']],
        });
        //console.log(response);
        if(response){
            return res.status(201).json(response);
        }else{
            return res.status(401).json("Empty");
        }
    }catch(error){
        console.log(error)
        res.status(401).json(error);
    }
}

const postCount = async(req, res) =>{
    const { value } = req.body;
    if(!value) return res.status(401).json("no value");
    try{
        const response = await sequelize.models.Count.create({count : parseInt(value)});
        //console.log(response);
        if(response){
            return res.status(201).json(response);
        }else{
            return res.status(401).json("fail");
        }
    }catch(error){
        console.log(error)
        res.status(401).json(error);
    }
} 

module.exports = {getCount, postCount } ;
