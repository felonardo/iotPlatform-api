
// import models
import Application from "../models/Application.js";
import Device from "../models/Device.js";
import express, { response } from "express";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import qs from "qs";
import bodyParser from "body-parser";


function getToken() {

  const payload = {
    'email': 'admin',
    'password': 'admin'
}

   var config = {
    method: 'post',
    url: `http://198.199.80.68:8080/api/`+ "internal" + "/" + "login",
    headers: { 
      'Content-Type': 'application/json'
    },
    data : payload
  };
  return axios(config)

  .then(response => String(response.data.jwt))
}

export const getAppChirpStack = async (req, res) => {
  var tokenlora;
    try {
        await getToken().then(function(response){
            tokenlora = response; 
        })
        console.log(req.body)
                    console.log("lalali:" + tokenlora)
                    const apiResponse = await axios.get(`http://198.199.80.68:8080/api/applications?limit=50`, 
                    {
                    headers: { 
                      'Authorization': "Bearer "+ tokenlora,
                      'Content-Type': 'application/json'
                    },
                    })
                    console.log(apiResponse.data);
                    res.json(apiResponse.data);
                  // }) 
          
        } catch(error) {
            console.log("lilia",error);
            console.log(error);
            res.status(500).json({message: error.message});
          };
}

export const postAppChirpStack = async (req, res) => {
  var tokenlora;

  await getToken().then(function(response){
    tokenlora = response; 
})
console.log("bodybody:",req.body)
            const body = {
                "application": {
                  "description": req.body.description,
                  "id": "0",
                  "name": req.body.name,
                  "organizationID": "1",
                  "payloadCodec": "",
                  "payloadDecoderScript": "",
                  "payloadEncoderScript": "",
                  "serviceProfileID": "29c98c3a-1444-4557-8e4c-afca46fb5226"
                }
              }

          var config = {
            method: 'post',
            url: "http://198.199.80.68:8080/api/applications",
            headers: { 
              'Authorization': "Bearer " + tokenlora,
              'Content-Type': 'application/json'
            },
            data : body
          };
            axios(config)
            .then(function (response) {
              // datas = response.data
        
              console.log("rs1:", JSON.stringify(response.data));
              res.json(response.data);
            })
            .catch(function (error) {
              console.log("lilia",error);
              console.log(error);
              res.status(500).json({message: error.message});
            });
}

export const getDevChirpStack = async (req, res) => {
  var tokenlora;
    try {

      await getToken().then(function(response){
        tokenlora = response; 
    })
            const apiResponse = await axios.get(`http://198.199.80.68:8080/api/devices?limit=100`, 
            {
            headers: { 
              'Authorization': "Bearer "+ tokenlora, 
              'Content-Type': 'application/json'
            },
            })
            res.json(apiResponse.data);
          } catch(error) {
            console.log("lilia",error);
            console.log(error);
            res.status(500).json({message: error.message});
          };
}

export const postDevChirpStack = async (req, res) => {
          var tokenlora;

            await getToken().then(function(response){
              tokenlora = response; 
          })
          const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          // console.log("rrr:"+genRanHex(16))
          console.log("bodybody:",req.body)
            const body = {
                "device": {
                  "applicationID": req.body.applicationID,
                  "description": "",
                  "devEUI": String(genRanHex(16)),
                  "deviceProfileID": "68a5f864-1b98-41d8-a4e4-bcba3caa3b7a",
                  "name": req.body.name,
                  "referenceAltitude": 0,
                  "skipFCntCheck": true,
                  "tags": {},
                  "variables": {}
                }
              }


          var config = {
            method: 'post',
            url: "http://198.199.80.68:8080/api/devices",
            headers: { 
              'Authorization': "Bearer " + tokenlora,
              'Content-Type': 'application/json'
            },
            data : body
          };
            axios(config)
            .then(function (response) {
              // datas = response.data
              var query = { 
                deviceName: req.body.name,
              }
              console.log("q:",query)
              try{
              Device.findOneAndUpdate(query, {$set:{isLora: true}}, {new: true}, (err, doc) => {
                if (err) {
                    console.log("Something wrong when updating data!");
                }
            
                console.log(doc);
            });
            } catch(e){
              console.log(e)
            }
              console.log("rs1:", JSON.stringify(response.data));
              res.json(response.data);
            })
            .catch(function (error) {
              console.log("lilia",error);
              console.log(error);
              res.status(500).json({message: error.message});
            //   res.status(404).json({message: error.message});
            });
}