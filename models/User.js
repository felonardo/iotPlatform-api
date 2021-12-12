import mongoose from "mongoose";

//Schema
const User = mongoose.Schema({
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
});

// export model
export default mongoose.model('Users', User);