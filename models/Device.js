import mongoose from "mongoose";

//Schema
const Device = mongoose.Schema({
    timestamp: { 
        type: Date, 
        default: Date.now
    },
    deviceName:{
        type: String,
        required: true
    },
    appId:{
        type: String,
        required: true
    },
    datas: [
        {
            data: {
                type: Object,
            },
            timestamp: { 
                type: Date, 
                default: Date.now
            },
        },
    ],
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
export default mongoose.model('Devices', Device);