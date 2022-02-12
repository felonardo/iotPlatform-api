
// import models
import Application from "../models/Application.js";
import Device from "../models/Device.js";
import express from "express";
const axios = require('axios');
import jwt_decode from 'jwt-decode';
var qs = require('qs');
var bodyParser = require('body-parser');
// import bodyParser from "body-parser";


// function get JWT CHIRPSTACK
export const getJWT = async (req, res) => {
    // try {  
        // const usertoken = req.headers.authorization;
        // const token = usertoken.split(' ');
        // var decoded = jwt_decode(token[1]);
        // var query = { 
        //     // appId: req.params.appId, 
        //     "users.userId": decoded.sub 
        // };
        // console.log(query)
        const username = {
            'username': 'admin',
            'password': 'admin'
        }

        var body = qs.stringify(username);

           var config = {
            method: 'post',
            url: `${host}:8080/`+ "internal" + "/" + "login",
            headers: { 
            //   'Authorization': req.headers.authorization, 
              'Content-Type': 'application/json'
            },
            data : body
          };
            axios(config)
            .then(function (response) {
              datas = response.data
        
              console.log("rs1:", JSON.stringify(response.data.jwt));
              res.json(datas.jwt);
            })
            .catch(function (error) {
              console.log("lilia",error);
              console.log(error);
              res.status(500).json({message: error.message});
            //   res.status(404).json({message: error.message});
            });
// }
}


export const getAppChirpStack = async (req, res) => {
    try {
            const jwt = getJWT()
            const apiResponse = await axios.get(`${host}:8080/api/applications?limit=50`, 
            {
            headers: { 
              'Authorization': "Bearer "+jwt, 
              'Content-Type': 'application/json'
            },
            })
            datas = apiResponse.data
            console.log("lulululul", datas)
            res.json(datas);
          } catch(error) {
            console.log("lilia",error);
            console.log(error);
            res.status(500).json({message: error.message});
          //   res.status(404).json({message: error.message});
          };
}

export const postAppChirpStack = async (req, res) => {
    // try {
            const jwt = getJWT()
            const appl = {
                "application": {
                  "description": "string",
                  "id": "",
                  "name": "string",
                  "organizationID": "0",
                  "payloadCodec": "string",
                  "payloadDecoderScript": "string",
                  "payloadEncoderScript": "string",
                  "serviceProfileID": "1"
                }
              }

            var body = qs.stringify(
                appl
            );

          var config = {
            method: 'post',
            url: "${host}:8080/api/applications",
            headers: { 
              'Authorization': "Bearer "+jwt,
              'Content-Type': 'application/json'
            },
            data : body
          };
            axios(config)
            .then(function (response) {
              datas = response.data
        
              console.log("rs1:", JSON.stringify(response.data));
              res.json(datas.jwt);
            })
            .catch(function (error) {
              console.log("lilia",error);
              console.log(error);
              res.status(500).json({message: error.message});
            //   res.status(404).json({message: error.message});
            });
}

export const getDevChirpStack = async (req, res) => {
    try {
            const jwt = getJWT()
            const apiResponse = await axios.get(`${host}:8080/api/devices?limit=100`, 
            {
            headers: { 
              'Authorization': "Bearer "+jwt, 
              'Content-Type': 'application/json'
            },
            })
            datas = apiResponse.data
            console.log("lulululul", datas)
            res.json(datas);
          } catch(error) {
            console.log("lilia",error);
            console.log(error);
            res.status(500).json({message: error.message});
          //   res.status(404).json({message: error.message});
          };
}

export const postDevChirpStack = async (req, res) => {
    // try {
            const jwt = getJWT()
            const dev = {
                "device": {
                  "applicationID": "string",
                  "description": "string",
                  "devEUI": "string",
                  "deviceProfileID": "string",
                  "name": "string",
                  "referenceAltitude": 0,
                  "skipFCntCheck": true,
                  "tags": {},
                  "variables": {}
                }
              }

            var body = qs.stringify(
                dev
            );

          var config = {
            method: 'post',
            url: "${host}:8080/api/devices",
            headers: { 
              'Authorization': "Bearer "+jwt,
              'Content-Type': 'application/json'
            },
            data : body
          };
            axios(config)
            .then(function (response) {
              datas = response.data
        
              console.log("rs1:", JSON.stringify(response.data));
              res.json(datas.jwt);
            })
            .catch(function (error) {
              console.log("lilia",error);
              console.log(error);
              res.status(500).json({message: error.message});
            //   res.status(404).json({message: error.message});
            });
}