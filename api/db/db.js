const mongoose = require('mongoose');

class DB{

    static Collections = {
        USERS: "user",
    }

    static async Connect(){
        try{
            mongoose.set("strictQuery", false);
            return await mongoose.connect(process.env.DATABASE_URL);
        } catch(err){
            throw new Error(err);
        }
    }

    static Disconnect(){
        try{
            mongoose.disconnect();
        }catch(err){
            throw new Error(err);
        }
    }
}

module.exports = DB;