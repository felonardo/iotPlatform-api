// const dotenv = require('dotenv');
import express from "express";
import mongoose from "mongoose";
import route from "./routes/index.js";
import cors from "cors";

const app = express()

// connect db mongoDB
mongoose.connect("mongodb+srv://felonardo:dune2021@cluster0.4r4hl.mongodb.net/qibo-db-dev?retryWrites=true&w=majority",{ 
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
app.listen(5000)