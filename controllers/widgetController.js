// import models
import Widget from "../models/Widget.js";
import express from "express";
import jwt_decode from 'jwt-decode';
// import bodyParser from "body-parser";

// function get All Products
export const getWidgets = async (req, res) => {
    try {  
        const usertoken = req.headers.authorization;
        const token = usertoken.split(' ');
        var decoded = jwt_decode(token[1]);
        var query = { 
            // appId: req.params.appId, 
            "users.userId": decoded['https://localhost:5000/email']
        };
        console.log(decoded['https://localhost:5000/email']);
        console.log(query)
        const applications = await Widget.find(query);
        console.log(applications)
        res.json(applications);
    } catch (error) {

        console.log("fail")
        res.status(500).json({message: error.message});
    }
    
}

// export const getWidgetData = async (req, res) => {
//     try {  
//         const usertoken = req.headers.authorization;
//         const token = usertoken.split(' ');
//         var decoded = jwt_decode(token[1]);
//         var query = { 
//             appId: req.params.appId, 
//             deviceName: req.params.deviceName,
//         }
//         console.log(query)
//         // const devices = await Widget.find(query).sort({"datas.timestamp": 'desc'});
//         const devices = await Widget.aggregate([
//             { $match: query},
//             { $unwind: '$datas' },
//             { $limit : 20},
//             { $sort: { 'datas.timestamp': -1 }},
//             { $group: { _id: '$_id', datas: { $push: '$datas'}}}])
//         console.log("get Widget Data:",devices)
//         res.json(devices);
//     } catch (error) {

//         console.log("fail")
//         res.status(500).json({message: error.message});
//     }
    
// }


// function get single Product
// export const getWidgetById = async (req, res) => {
//     try {
//         const device = await Widget.findById(req.params.id);
//         res.json(device);
//     } catch (error) {
//         res.status(404).json({message: error.message});
//     }
    
// }



// export const updateWidgetData = async (req, res) => {
//     try {
//         console.log("tes2",req.body)
//         var query = { 
//             appId: req.params.appId,
//             deviceName: req.params.deviceName,
//         };
//         var update = {
//             $push: { 
//                 "datas": 
//             {
//                 $each: [{data: req.body}],
//                 $sort: {timestamp: -1},
//                 // $slice: 3
//             }
//         },
//         }
//         console.log(query);
//         var device = await Widget.findOneAndUpdate(query, update,  {
//             new: true,
//             upsert: true,
//             // sort: { 'datas.timestamp': -1 },
//             // limit: {'datas': 2},
//           });
//         var tes = await Widget.findOne(query, {'datas': {$slice:20}});
//         console.log("dev:",device)
//         console.log("tes######:",JSON.stringify(tes))
//         res.json(tes);

//     } catch (error) {
//         res.status(404).json({message: error.message});
//     }
    
// }

// function Create Product
export const saveWidget = async (req, res) => {
    console.log(req.body)
    if (!req.body.deviceName || !req.body.appId || !req.body.datax ) {
        return res.status(400).json({ 'message': 'appId,deviceName and field are required' });
    }

    try {
        const result = await Widget.create({
            appId: req.body.appId,
            deviceName: req.body.deviceName,
            datax: req.body.datax,
            type: req.body.type,
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
export const updateWidget = async (req, res) => {
    const cekId = await Widget.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"}); 
    try {
        const updatedWidget = await Widget.updateOne({_id: req.params.id}, {$set: req.body});
        res.status(200).json(updatedWidget);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

// function Delete Product
export const deleteWidget = async (req, res) => {
    const cekId = await Widget.findById(req.params.id);
    if(!cekId) return res.status(404).json({message: "Data tidak ditemukan"});
    try {
        const deletedWidget = await Widget.deleteOne({_id: req.params.id});
        res.status(200).json(deletedWidget);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}