const DB = require("../db/db");
const UserCollection = require("../db/users_collection");
const bcrypt = require('bcrypt');

class Model_Auth{

    static async CreateAccount(userName, email, password, verified){
        try{
            await DB.Connect();

            const userByName = await UserCollection.FindOne({userName: userName});

            if(userByName){
                DB.Disconnect();
                return {user: null, message: "Username is Already Exists"};
            }
            
            const userByEmail = await UserCollection.FindOne({email: email});

            if(userByEmail){
                DB.Disconnect();
                return {user: null, message: "E-Mail is Already Exists"};
            }

            let hashedPassword = await bcrypt.hash(password, 10);

            const user = await UserCollection.Add(userName, email, hashedPassword, verified);

            DB.Disconnect();

            return {user: user, message: "Success"};

        }catch(err){
            DB.Disconnect();
            throw new Error(err);
        }
    }

    static async LogIn(email, password){
        try{
            await DB.Connect();
            
            const user = await UserCollection.FindOne({email: email});

            if(!user){
                DB.Disconnect();
                return {user: null, message: "E-Mail not Found"};
            }

            let samePassword = await bcrypt.compare(password, user.password);
            if(!samePassword){
                DB.Disconnect();

                return {user: null, message: "E-Mail or Password is Wrong"};
            }

            if(!user.verified){
                DB.Disconnect();
                return {user: null, message: "E-Mail is not Verified Please Check your E-Mail"};
            }

            DB.Disconnect();

            return {user: user, message: "Success"};

        }catch(err){
            DB.Disconnect();
            throw new Error(err);
        }
    }
}

module.exports = Model_Auth;