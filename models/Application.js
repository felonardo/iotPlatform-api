import mongoose from "mongoose";

//Schema
const Application = mongoose.Schema({
    timestamp: { 
        type: Date, 
        default: Date.now
    },
    appName:{
        type: String,
        required: true
    },
    appId:{
        type: String,
        required: true
    },
    users: [
        {
        userId:{
            type: String,
            required: true
        },
        userName:{
            type: String,
            required: true
        },
        userEmail:{
            type: String,
            required: true
        },
    }
    ] 
});

// export model
export default mongoose.model('Applications', Application);