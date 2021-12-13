// const dotenv = require('dotenv');
import express from "express";
import mongoose from "mongoose";
import route from "./routes/index.js";
import cors from "cors";

const app = express()

// connect db mongoDB
mongoose.connect("mongodb+srv://felonardo:dune2021@cluster0.4r4hl.mongodb.net/qibo-db?retryWrites=true&w=majority",{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', (error)=> console.error(error));
db.once('open', () => console.log('Database Connected'));

// app.use(express.urlencoded({extended: false}));
// app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json)
// app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//     extended: false
//   }));

// var jwtCheck = jwt({
//       secret: jwks.expressJwtSecret({
//           cache: true,
//           rateLimit: true,
//           jwksRequestsPerMinute: 5,
//           jwksUri: 'https://dev-aa9a8b36.us.auth0.com/.well-known/jwks.json'
//     }),
//     audience: 'http://localhost:5000',
//     issuer: 'https://dev-aa9a8b36.us.auth0.com/',
//     algorithms: ['RS256']
// });

// console.log("tes:");
// console.log(jwtCheck);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/', route);


// app.use(jwtCheck);

app.get('/test', (req, res) => {
    res.json({
        type: "OK"
    })
})

// app.get('/private', jwtCheck, (req, res) => {
//     res.json( {
//         "sensors": [
//             {
//               "id": "F4:A5:74:89:16:57",
//               "mac": "F4:A5:74:89:16:57",
//               "data": {
//                 "humidity": 46.5,
//                 "temperature": 24.36,
//                 "pressure": 998.55,
//                 "acceleration": 1038.0433516958722,
//                 "acceleration_x": 78,
//                 "acceleration_y": -15,
//                 "acceleration_z": 1035,
//                 "battery": 2893
//               },
//               "timestamp": "2017-07-01T18:36:56.547306"
//             },
//             {
//               "id": "CA:F7:44:DE:EB:E1",
//               "mac": "CA:F7:44:DE:EB:E1",
//               "data": {
//                 "temperature": 24.0,
//                 "humidity": 38.0,
//                 "pressure": 998.0,
//                 "identifier": null
//               },
//               "timestamp": "2017-07-01T18:36:57.229115"
//             }
//           ],
//           "sensordatas": [
//             {
//               "id": 0,
//               "mac": "F4:A5:74:89:16:57",
//               "data": {
//                 "humidity": 46.5,
//                 "temperature": 24.35,
//                 "pressure": 998.48,
//                 "acceleration": 1030.2921915650918,
//                 "acceleration_x": 82,
//                 "acceleration_y": -7,
//                 "acceleration_z": 1027,
//                 "battery": 2887
//               },
//               "timestamp": "2017-07-01T18:36:56.044941"
//             },
//             {
//               "id": 1,
//               "mac": "F4:A5:74:89:16:57",
//               "data": {
//                 "humidity": 46.5,
//                 "temperature": 24.36,
//                 "pressure": 998.55,
//                 "acceleration": 1038.0433516958722,
//                 "acceleration_x": 78,
//                 "acceleration_y": -15,
//                 "acceleration_z": 1035,
//                 "battery": 2893
//               },
//               "timestamp": "2017-07-01T18:36:56.547306"
//             },
//             {
//               "id": 2,
//               "mac": "CA:F7:44:DE:EB:E1",
//               "data": {
//                 "temperature": 24.0,
//                 "humidity": 38.0,
//                 "pressure": 998.0,
//                 "identifier": null
//               },
//               "timestamp": "2017-07-01T18:36:57.229115"
//             }
//           ]
//         }
//     )
// })


// app.get('/authorized', function (req, res) {
//     res.send('Secured Resource');
// });

app.listen(5000)