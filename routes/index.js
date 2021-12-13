import express from "express";

import { getApplications, 
    getApplicationById, 
    saveApplication, 
    updateApplication,
    updateApplicationUserById,
    deleteApplication } from "../controllers/applicationController.js";

import { getDevices, 
        getDeviceData, 
        updateDeviceData, 
        getDeviceById, 
        saveDevice, 
        updateDevice,
        deleteDevice } from "../controllers/deviceController.js";
    
    // express router
const router = express.Router();
 
const app = express()

import jwt from "express-jwt";
import jwks from "jwks-rsa";

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-aa9a8b36.us.auth0.com/.well-known/jwks.json'
    }),
    audience: 'http://143.244.150.6:5000',
    issuer: 'https://dev-aa9a8b36.us.auth0.com/',
    algorithms: ['RS256']
});


// var jwtCheck = jwt({
//       secret: 'hello',
//     audience: 'http://localhost:5000',
//     issuer: 'https://dev-aa9a8b36.us.auth0.com/',
//     algorithms: ['RS256']
// });

// app.use(jwtCheck);
router.get('/applications', jwtCheck, getApplications);
router.get('/applications/:id', jwtCheck, getApplicationById);
router.post('/applications/:id/adduser', jwtCheck, updateApplicationUserById);
router.post('/applications', jwtCheck, saveApplication);
router.patch('/applications/:id', jwtCheck, updateApplication);
router.delete('/applications/:id', jwtCheck, deleteApplication);

router.get('/devices/:appId', jwtCheck, getDevices);
router.get('/:appId/:deviceName', jwtCheck, getDeviceData);
router.post('/:appId/:deviceName', jwtCheck, updateDeviceData);
router.post('/devices', jwtCheck, saveDevice);
router.patch('/devices/:id', jwtCheck, updateDevice);
router.delete('/devices/:id', jwtCheck, deleteDevice);

// export router
export default router;

