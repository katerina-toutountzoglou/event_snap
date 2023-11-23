import mongoose from 'mongoose';

const eventSchema=mongoose.Schema(
    {
        event_title:{
            type:String,
            required:true
        },
        location:{
            type: String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        venue:{
            type:String,
            required:false
        },
        event_type:{
            type: String,
            required:true
        },
        image_urls:[],
        description:{
            type: String,
            required: true,

        },
        remaining_tickets:{
            type: Number,
            required: true
        },
        event_date:{
            type: Date,
            required:true
        }


    },{
        timestamps:true,
    }
)


export default mongoose.models?.events||mongoose.model('events',eventSchema);