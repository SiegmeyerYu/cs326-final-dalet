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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Database = /** @class */ (function () {
    function Database(user, shop, activity) {
        var _this = this;
        this.MongoClient = require('mongodb').MongoClient;
        this.uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
        this.shop_next = 0;
        this.activity_next = 0;
        this.dbName = "dalet";
        this.collection_user = user;
        this.collection_shop = shop;
        this.collection_activity = activity;
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
        (function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.connect()["catch"](function (err) { console.log(err); })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); })();
    }
    // Get ID number for new created shop
    // Increment ID number for next shop
    Database.prototype.getNextShopID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = this.shop_next;
                this.shop_next++;
                return [2 /*return*/, result];
            });
        });
    };
    Database.prototype.getNextActivityID = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                result = this.activity_next;
                this.activity_next++;
                return [2 /*return*/, result];
            });
        });
    };
    Database.prototype.put_user_account = function (username, password, phone, email, shop_index, activity_array) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collection_user);
                        return [4 /*yield*/, collection.updateOne({ 'username': username }, { $set: { 'password': password, 'phone': phone, 'email': email, 'shop_index': shop_index, 'activity_index': activity_array } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log('put_user_account: result = ' + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.put_user_profile = function (username, alias, portrait_src, location, description, pet1_name, pet2_name, pet1_src, pet2_src) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collection_user);
                        return [4 /*yield*/, collection.updateOne({ 'username': username }, { $set: { 'alias': alias, 'portrait_src': portrait_src, 'location': location, 'description': description, 'pet1_name': pet1_name, 'pet2_name': pet2_name, 'pet1_src': pet1_src, 'pet2_src': pet2_src } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log('put_user_profile: result = ' + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.get_user = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collection_user);
                        return [4 /*yield*/, collection.findOne({ 'username': key })];
                    case 1:
                        result = _a.sent();
                        console.log("get_user: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFound_user = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get_user(key)];
                    case 1:
                        v = _a.sent();
                        console.log("isFound_user: result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.put_shop = function (id, owner, name, type, open_hour, address, phone, email, url, logo_src, pic1_src, pic2_src, pic3_src, pic4_src, activity_index, rate, comment) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collection_shop);
                        return [4 /*yield*/, collection.updateOne({ 'id': id }, { $set: { 'owner': owner, 'name': name, 'type': type, 'open_hour': open_hour, 'address': address, 'phone': phone, 'email': email, 'url': url, 'logo_src': logo_src, 'pic1_src': pic1_src, 'pic2_src': pic2_src, 'pic3_src': pic3_src, 'pic4_src': pic4_src, 'activity_index': activity_index, 'rate': rate, 'comment': comment } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log("put_shop: result = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.get_shop = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collection_shop);
                        return [4 /*yield*/, collection.findOne({ 'id': key })];
                    case 1:
                        result = _a.sent();
                        console.log("get_shop: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFound_shop = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get_shop(key)];
                    case 1:
                        v = _a.sent();
                        console.log("isFound_shop: result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.put_activity = function (id, name, image_src, time, address, phone, email, decription, member) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collection_activity);
                        return [4 /*yield*/, collection.updateOne({ 'id': id }, { $set: { 'name': name, 'image_src': image_src, 'time': time, 'address': address, 'phone': phone, 'email': email, 'decription': decription, 'member': member } }, { 'upsert': true })];
                    case 1:
                        result = _a.sent();
                        console.log("put_activity: result = " + result);
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.get_activity = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var db, collection, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this.client.db(this.dbName);
                        collection = db.collection(this.collection_activity);
                        return [4 /*yield*/, collection.findOne({ 'id': key })];
                    case 1:
                        result = _a.sent();
                        console.log("get_activity: returned " + JSON.stringify(result));
                        if (result) {
                            return [2 /*return*/, result];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.prototype.isFound_activity = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            var v;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get_activity(key)];
                    case 1:
                        v = _a.sent();
                        console.log("isFound_activity: result = " + v);
                        if (v === null) {
                            return [2 /*return*/, false];
                        }
                        else {
                            return [2 /*return*/, true];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    //for customer.html searchbar
    Database.prototype.search_shop = function (key, type) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                /*
                let db = this.client.db(this.dbName);
                let collection = db.collection(this.collection_user);
                var cursor;
                if(type=="N/A"){
                let cursor = await collection.find({'key' : key})}
                else{
                let cursor = await collection.find({'key' : key,'type':type})
                }
                let result = cursor.hasNext()?cursor.next():null;
                console.log("search_shop" + JSON.stringify(result));
                if (result) {
                    return result;
                } else {
                    return null;
                }
                
                let result={'result' : 'search',
                'name' : "petpaw",
                'type' : "hospital",
                'address' :"123 central ave,amherst",
                'phone' : "781333-xxxx",
                'logo' : "src=./images/cat-example.jpg",
                'rate' : "5 stars" }*/
                return [2 /*return*/, true];
            });
        });
    };
    return Database;
}());
exports.Database = Database;
