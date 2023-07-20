const { default: mongoose } = require("mongoose")

const connectDB = async () => {
    try{
        let dbConnection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        if(dbConnection)
            console.log("MongoDB connected", dbConnection.connection._connectionString);

    }catch(err){
        console.log(err)
    }

}
module.exports = connectDB;