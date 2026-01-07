
import mongoose from "mongoose";
const locationSchema = new mongoose.Schema({
    location_name: { 
        type: String, 
        required: true 
    }
})


export default mongoose.model("Location", locationSchema);
