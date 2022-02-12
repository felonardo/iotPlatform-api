import mongoose from "mongoose";

//Schema
const Widget = mongoose.Schema({
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
    type:{
        type: String,
        required: true
    },
    datax:{
        type: String,
        default: "",
        required: true
    },
    datay:{
        type: String,
        default: ""
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
export default mongoose.model('Widgets', Widget);