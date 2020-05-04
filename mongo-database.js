"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Database {
    constructor(user, shop) {
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
        this.dbName = "dalet";
        this.collection_user = user;
        this.collection_shop = shop;
        this.client = new this.MongoClient(this.uri, { useNewUrlParser: true });
        // Open up a connection to the client.
        // The connection is asynchronous, but we can't call await directly
        // in the constructor, which cannot be async. So, we use "IIFE". Explanation below.
        /* from https://anthonychu.ca/post/async-await-typescript-nodejs/
    
          Async/Await and the Async IIFE
    
          The await keyword can only be used inside of a function
          marked with the async keyword. [...] One way to do this is
          with an "async IIFE" (immediately invoked function
          expression)...
    
           (async () => {
           // code goes here
           })();
    
        */
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect().catch(err => { console.log(err); });
        }))();
    }
    put_user_account(username, password, phone, email, shop_index, activity_array) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_user);
            let result = yield collection.updateOne({ 'username': username }, { $set: { 'password': password, 'phone': phone, 'email': email, 'shop_index': shop_index, 'activity_index': activity_array } }, { 'upsert': true });
            console.log('put_user_account: result = ' + result);
        });
    }
    put_user_profile(username, alias, portrait_src, location, description, pet1_name, pet2_name, pet1_src, pet2_src) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_user);
            let result = yield collection.updateOne({ 'username': username }, { $set: { 'alias': alias, 'portrait_src': portrait_src, 'location': location, 'description': description, 'pet1_name': pet1_name, 'pet2_name': pet2_name, 'pet1_src': pet1_src, 'pet2_src': pet2_src } }, { 'upsert': true });
            console.log('put_user_profile: result = ' + result);
        });
    }
    put_user_shop(username, shop_index) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_user);
            let result = yield collection.updateOne({ 'username': username }, { $set: { 'shop_index': shop_index } });
            console.log('put_user_shop: result = ' + result);
        });
    }
    get_user(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_user);
            let result = yield collection.findOne({ 'username': key });
            console.log("get_user: returned " + JSON.stringify(result));
            if (result) {
                return result;
            }
            else {
                return null;
            }
        });
    }
    isFound_user(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let v = yield this.get_user(key);
            console.log("isFound_user: result = " + v);
            if (v === null) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    put_shop(owner, name, type, open_hour, address, phone, email, url, logo_src, pic1_src, pic2_src, pic3_src, pic4_src) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_shop);
            let result = yield collection.updateOne({ 'owner': owner }, { $set: { 'name': name, 'type': type, 'open_hour': open_hour, 'address': address, 'phone': phone, 'email': email, 'url': url, 'logo_src': logo_src, 'pic1_src': pic1_src, 'pic2_src': pic2_src, 'pic3_src': pic3_src, 'pic4_src': pic4_src } }, { 'upsert': true });
            console.log("put_shop: result = " + result);
        });
    }
    get_shop(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_shop);
            console.log("check get_shop: " + key);
            let result = yield collection.findOne({ 'name': key });
            console.log("get_shop: returned " + JSON.stringify(result));
            if (result) {
                return result;
            }
            else {
                return null;
            }
        });
    }
    isFound_shop(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let v = yield this.get_shop(key);
            console.log("isFound_shop: result = " + v);
            if (v === null) {
                return false;
            }
            else {
                return true;
            }
        });
    }
    delete_shop(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_shop);
            let result = yield collection.deleteOne({ 'name': key });
            console.log("result = " + result);
        });
    }
    //for customer.html searchbar
    serach_shop(key, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let db = this.client.db(this.dbName);
            let collection = db.collection(this.collection_user);
            if (type == "N/A") {
                let result = yield collection.find({
                    name: { $regex: new RegExp(key, "g") }
                });
            }
            else {
                let result = yield collection.find({ 'name': { "$regex": new RegExp(key, "g") }, 'type': type });
            }
            /*
            let result={'result' : 'search',
            'name' : "Petpaw",
            'type' : "Hospital",
            'address' :"123 central ave,Amherst,MA",
            'phone' : "781333-xxxx",
            'logo_src' : "<img alt=\"store\" src=\"./images/cat-example.jpg\">",
            'rate' : "5 stars" }
            return result;
            */
        });
    }
}
exports.Database = Database;
