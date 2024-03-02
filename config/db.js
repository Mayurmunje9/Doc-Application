const mongoose=require('mongoose')


const connectToDb =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDb connected ${mongoose.connection.host}`)
    } catch (error) {
        console.log(`MongoDb servrt issue ${error}`);
    }
}
module.exports=connectToDb;