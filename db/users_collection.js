const mongoose = require('mongoose');

const DB = require("./db");

class CUsers{

    static #Schema = mongoose.Schema({
    
        userName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        verified: {
            type: Boolean,
            required: true,
        }
    })

    static #User = mongoose.model(DB.Collections.USERS, this.#Schema);

    static async Add(userName, email, password, verified){
        try{
            const user = new this.#User({
                userName: userName,
                email: email,
                password: password,
                verified: verified,
            });
    
            await user.save();
            return user;

        }catch(err){
            throw new Error(err);
        }
    }

    static async Find(validation){
        try{
            const users = await this.#User.find(validation);
            return users;
        }catch(err){
            throw new Error(err);
        }
    }

    static async FindOne(validation){
        try{
            const user = await this.#User.findOne(validation);
            return user;
        }catch(err){
            throw new Error(err);
        }
    }

    static async FindByID(userID){
        try{
            const user = await this.#User.findById(userID);
            return user;
        }catch(err){
            throw new Error(err);
        }
    }

    static async DeleteOne(userID){
        try{
            const user = await User.deleteOne({id: userID});
            return user;
        } catch(err){
            throw new Error(err);
        }
    }
}

module.exports = CUsers;