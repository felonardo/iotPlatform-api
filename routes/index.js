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


import { getWidgets, 
    saveWidget, 
    updateWidget,
    deleteWidget } from "../controllers/widgetController.js";


import { getAppChirpStack, postAppChirpStack, getDevChirpStack, postDevChirpStack } from "../controllers/chirpstackController.js";
    
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
    audience: 'http://localhost:5000',
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

router.get('/device/:deviceName', jwtCheck, getDeviceById);
// router.get('/device/:appId/:deviceName', jwtCheck, getDeviceById);
router.get('/devices/:appId', jwtCheck, getDevices);
router.get('/:appId/:deviceName', jwtCheck, getDeviceData);
router.post('/:appId/:deviceName', jwtCheck, updateDeviceData);
router.post('/devices', jwtCheck, saveDevice);
router.patch('/devices/:id', jwtCheck, updateDevice);
router.delete('/devices/:id', jwtCheck, deleteDevice);

router.get('/widgets', jwtCheck, getWidgets);
// router.get('/:appId/:widgetName', jwtCheck, getWidgetData);
// router.post('/:appId/:widgetName', jwtCheck, updateWidgetData);
router.post('/widgets', jwtCheck, saveWidget);
router.patch('/widgets/:id', jwtCheck, updateWidget);
router.delete('/widgets/:id', jwtCheck, deleteWidget);

//chirpstack
// router.get('/api/lora/getJWT', jwtCheck, getJWT);
router.get('/api/app/lora', jwtCheck, getAppChirpStack);
router.post('/api/app/lora', jwtCheck, postAppChirpStack);
// // router.post('/api/organizations', jwtCheck, method);
router.post('/api/dev/lora', jwtCheck, postDevChirpStack);
router.get('/api/dev/lora', jwtCheck, getDevChirpStack);
// router.get('/api/device-profiles', jwtCheck, method);
// router.get('/api/devices/:id/frames', jwtCheck, method);
// router.post('/api/internal/login', jwtCheck, method);


// export router
export default router;

