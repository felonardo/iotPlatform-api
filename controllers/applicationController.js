// import models
import Application from "../models/Application.js";
import express from "express";
import jwt_decode from 'jwt-decode';
// import bodyParser from "body-parser";

// function get All Products
export const getApplications = async (req, res) => {
    try {  
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
    var decoded = jwt_decode(token[1]);
        // var query = { "users.userId": decoded.sub}
        var query = { "users.userId": decoded['https://localhost:5000/email']}
        console.log(decoded['https://localhost:5000/email']);
        // console.log(query);
        console.log("popo")

        const applications = await Application.find(query);
        res.json(applications);
    } catch (error) {

        console.log("fail")
        res.status(500).json({message: error.message});
    }
    
}

// function get single Product
export const getApplicationById = async (req, res) => {
    try {
        console.log("titut")
        var query = { appId: req.params.id };
        const application = await Application.find(query);
        res.json(application);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
    
}

export const updateApplicationUserById = async (req, res) => {
    try {
        console.log("tes",req.body)
        var query = { 
            appId: req.body.appId
        };
        var update = {
            $push: { "users": 
            {
                userId: req.body.userId,
                userName: req.body.userName,
                userEmail:  req.body.userEmail
            
            }},
        }
        console.log(query);
        const application = await Application.findOneAndUpdate(query, update);
        res.json(application);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
    
}
// function Create Product
export const saveApplication = async (req, res) => {
    console.log(req.body)
    if (!req.body.appName || !req.body.appId ) {
        return res.status(400).json({ 'message': 'id and names are required' });
    }

    try {
        const result = await Application.create({
            appId: req.body.appId,
            appName: req.body.appName,
            users: [
                    {
                        userId: req.body.userId,
                        userName: req.body.userName,
                        userEmail: req.body.userEmail,
                    },
            ],
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
        res.status(400).json(err.message);
    }
}

// function Update Product
export const updateApplication = async (req, res) => {
    const cekId = await Application.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"}); 
    try {
        const updatedApplication = await Application.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedApplication);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// function Delete Product
export const deleteApplication = async (req, res) => {
    const cekId = await Application.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"});
    try {
        const deletedApplication = await Application.deleteOne({_id: req.params.id});
        res.status(200).json(deletedApplication);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}