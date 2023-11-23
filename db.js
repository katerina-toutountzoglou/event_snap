import mongoose from 'mongoose';


const CONNECTION_URL='mongodb+srv://atoutoun85:123456katerina@cluster0.wldg1rz.mongodb.net/Node-api?retryWrites=true&w=majority';
mongoose.connect(CONNECTION_URL)

var connection= mongoose.connection

connection.on('error',()=>{
    console.log('Mongo db connection failed!')
})

connection.on('connected',()=>{
    console.log('Mongo db connection succesful!')
})



export default mongoose;