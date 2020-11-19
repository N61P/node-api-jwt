const { create, getAll, getById, updateById, deleteById, getUserByEmail } = require('./user.service');
const { genSaltSync, hashSync, compareSync } = require('bcrypt'); 
const { sign } = require("jsonwebtoken");
module.exports = {
    createUser: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        create(body, (error, emailExst, result)=>{
            if(error){
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error!'
                })
            }
            else if(emailExst){
                return res.status(200).json({
                    success: 0,
                    message: 'Email already exists in the database!',
                })
            }
            else{
                return res.status(200).json({
                    success: 1,
                    message: 'Record inserted successfuly',
                    data: result
                })
            }
        })
    },
    getAllUsers: (req, res)=>{
        getAll((error, result)=>{
            if(error){
                res.status(500).json({
                    success: 0,
                    message: error.message
                })
            }
            else{
                res.status(200).json({
                    success: 1,
                    data: result
                });
            }
        })
    },
    getUserById: (req, res)=>{
        // console.log('mangal: ', req.params);return false;
        const id = req.params.userId;
        getById(id, (error, result)=>{
            if(error){
                res.status(500).json({
                    success:0,
                    message: 'internal server error'
                })
            }
            else if(!result){
                res.status(200).json({
                    success:0,
                    message: 'Record not found'
                })
            }
            else{
                res.status(200).json({
                    success:1,
                    data: result
                })
            }
        })
    },
    updateUserById: (req, res)=>{
        const body = req.body;
        const salt = genSaltSync(10);
        body.password = hashSync(body.password, salt);
        updateById(body, (error, emailExst, result)=>{
            if(error){
                return res.status(500).json({
                    success: 0,
                    message: 'Database connection error!'
                })
            }
            else if(emailExst){
                return res.status(200).json({
                    success: 0,
                    message: 'Email already exist in the database!',
                })
            }
            else if(!result.affectedRows){
                return res.status(200).json({
                    success: 0,
                    message: 'Record not found!'
                })
            }
            else{
                return res.status(200).json({
                    success: 1,
                    message: 'Record updated successfuly',
                    data: result
                })
            }
        })
    },
    deleteUserById: (req, res)=>{
        const data = req.body;
        deleteById(data, (error, result)=>{
            if(error){
                res.status(500).json({
                    success:0,
                    message: 'internal server error'
                })
            }
            else if(!result.affectedRows){
                res.status(200).json({
                    success:0,
                    message: 'Record not found'
                })
            }
            else{
                res.status(200).json({
                    success:1,
                    message: 'Record deleted successfuly'
                })
            }
        }) 
    },
    login: (req, res)=>{
        const body = req.body;
        getUserByEmail(body.email, (error, result)=>{
            if(error){
                res.status(500).json({
                    success:0,
                    message:'internal server error!'
                })
            }
            else if(!result){
                response.status(200).json({
                    success:0,
                    message: 'invalid username or password',
                })
            }
            const match = compareSync(body.password, result.password);
            if(match){
                result.password = undefined;
                const jsontoken = sign({data: result}, process.env.SECRET_KEY, {expiresIn: "1h"});
                res.status(200).json({
                    success:1,
                    message: "login successfully!",
                    token: jsontoken
                })
            }else{
                res.status(200).json({success:0, message: 'invalid username or password!'})
            }
        })
    }
}