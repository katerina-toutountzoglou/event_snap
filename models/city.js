
import mongoose from 'mongoose';

const citySchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        info:{
            type: String,
            required: true,

        },
        image:{
            type: String,
            required: false
        }
        
    },{
        timestamps:true,
    }
)


export default mongoose.models?.cities||mongoose.model('cities',citySchema);