// import models
import Device from "../models/Device.js";
import express from "express";
import jwt_decode from 'jwt-decode';
// import bodyParser from "body-parser";

// function get All Products
export const getDevices = async (req, res) => {
    try {  
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        var decoded = jwt_decode(token[1]);
        var query = { 
            appId: req.params.appId, 
            // "users.userId": decoded.sub 
            "users.userId": decoded['https://localhost:5000/email']
        };
        console.log(decoded['https://localhost:5000/email']);
        console.log(query)
        const applications = await Device.find(query);
        res.json(applications);
    } catch (error) {

        console.log("fail")
        res.status(500).json({message: error.message});
    }
    
}

export const getDeviceData = async (req, res) => {
    try {  
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        var decoded = jwt_decode(token[1]);
        var query = { 
            appId: req.params.appId, 
            deviceName: req.params.deviceName,
        }
        console.log(query)
        // const devices = await Device.find(query).sort({"datas.timestamp": 'desc'});
        const devices = await Device.aggregate([
            { $match: query},
            { $unwind: '$datas' },
            { $limit : 20},
            { $sort: { 'datas.timestamp': -1 }},
            { $group: { _id: '$_id', datas: { $push: '$datas'}}}])
        console.log("get Device Data:",devices)
        res.json(devices);
    } catch (error) {

        console.log("fail")
        res.status(500).json({message: error.message});
    }
    
}


// function get single Product
export const getDeviceById = async (req, res) => {
    try {
        const device = await Device.findById(req.params.id);
        res.json(device);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
    
}



export const updateDeviceData = async (req, res) => {
    try {
        console.log("tes2",req.body)
        var query = { 
            appId: req.params.appId,
            deviceName: req.params.deviceName,
        };
        var update = {
            $push: { 
                "datas": 
            {
                $each: [{data: req.body}],
                $sort: {timestamp: -1},
                // $slice: 3
            }
        },
        }
        console.log(query);
        var device = await Device.findOneAndUpdate(query, update,  {
            new: true,
            upsert: true,
            // sort: { 'datas.timestamp': -1 },
            // limit: {'datas': 2},
          });
        var tes = await Device.findOne(query, {'datas': {$slice:20}});
        console.log("dev:",device)
        console.log("tes######:",JSON.stringify(tes))
        res.json(tes);

    } catch (error) {
        res.status(404).json({message: error.message});
    }
    
}

// function Create Product
export const saveDevice = async (req, res) => {
    console.log(req.body)
    if (!req.body.deviceName || !req.body.appId ) {
        return res.status(400).json({ 'message': 'id and names are required' });
    }

    try {
        const result = await Device.create({
            appId: req.body.appId,
            deviceName: req.body.deviceName,
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
export const updateDevice = async (req, res) => {
    const cekId = await Device.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"}); 
    try {
        const updatedDevice = await Device.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedDevice);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// function Delete Product
export const deleteDevice = async (req, res) => {
    const cekId = await Device.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"});
    try {
        const deletedDevice = await Device.deleteOne({_id: req.params.id});
        res.status(200).json(deletedDevice);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}