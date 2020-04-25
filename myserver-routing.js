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
var http = require('http');
var url = require('url');
var express = require('express');
var MyServer = /** @class */ (function () {
    function MyServer(db) {
        var _this = this;
        // Server stuff: use express instead of http.createServer
        this.server = express();
        this.port = 8080;
        this.router = express.Router();
        this.theDatabase = db;
        // from https://enable-cors.org/server_expressjs.html
        this.router.use(function (request, response, next) {
            response.header('Content-Type', 'application/json');
            response.header('Access-Control-Allow-Origin', '*');
            response.header('Access-Control-Allow-Headers', '*');
            next();
        });
        // Serve static pages from a particular path.
        this.server.use('/', express.static('./html'));
        this.server.use(express.json());
        //// HANDLE OPERATIONS
        this.router.post('/log_in', [this.userNotFoundHandler.bind(this), this.passwordIncorrectHandler.bind(this), this.logInHandler.bind(this)]); //partially done
        this.router.post('/sign_up', [this.signUpErrorHandler.bind(this), this.signUpHandler.bind(this)]); //done
        this.router.post('/home', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
        this.router.post('/profile', [this.userNotFoundHandler.bind(this), this.readProfileHandler.bind(this)]); //done
        this.router.post('/profile_edit', [this.userNotFoundHandler.bind(this), this.editProfileHandler.bind(this)]); //done
        this.router.post('/shop', [this.shopNotFoundHandler.bind(this), this.viewShopHandler.bind(this)]); //done
        this.router.post('/shop_create', this.createShopHandler.bind(this)); //done
        this.router.post('/shop_edit', [this.shopNotFoundHandler.bind(this), this.editShopHandler.bind(this)]); //done
        this.router.post('/shop_delete', [this.shopNotFoundHandler.bind(this), this.deleteShopHandler.bind(this)]); //done
        this.router.post('/shop_rate', [this.shopNotFoundHandler.bind(this), this.rateShopHandler.bind(this)]); //done
        this.router.post('/shop_comment', [this.shopNotFoundHandler.bind(this), this.commentShopHandler.bind(this)]); //done
        this.router.post('/activity', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
        this.router.post('/act_create', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
        this.router.post('/act_edit', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
        this.router.post('/act_delete', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
        this.router.post('/act_join', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
        this.router.post('/act_quit', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
        this.router.post('/search', [this.shopNotFoundHandler.bind(this), this.viewSearchResultHandler.bind(this)]);
        // Set a fall-through handler if nothing matches.
        this.router.post('*', function (request, response) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.send(JSON.stringify({ "result": "command-not-found" }));
                return [2 /*return*/];
            });
        }); });
        // Start up the endpoint at '/dalet'.
        this.server.use('/dalet', this.router);
    }
    MyServer.prototype.listen = function (port) {
        this.server.listen(port);
    };
    MyServer.prototype.toBeDefinedError = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                next();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.toBeDefined = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                response.write(JSON.stringify({ 'result': 'to be defined' }));
                response.end();
                return [2 /*return*/];
            });
        });
    };
    //for customer.html searchbar
    MyServer.prototype.viewSearchResultHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var keyword, shoptype, shop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("here!");
                        keyword = request.body.shopname;
                        shoptype = request.body.shoptype;
                        return [4 /*yield*/, this.theDatabase.serach_shop(keyword, shoptype)];
                    case 1:
                        shop = _a.sent();
                        response.write(JSON.stringify({ 'result': 'view shop',
                            'name': shop.name,
                            'type': shop.type,
                            'address': shop.address,
                            'phone': shop.phone,
                            'logo': shop.logo_src,
                            'rate': shop.rate }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.userNotFoundHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var username, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.theDatabase.isFound_user(username)];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            //alert('Username not Found!');
                            response.write(JSON.stringify({ 'result': 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.passwordIncorrectHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var username, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        password = request.body.password;
                        return [4 /*yield*/, this.theDatabase.get_user(username)];
                    case 1:
                        user = _a.sent();
                        if (user.password !== password) {
                            //alert('Password is incorrect!');
                            response.write(JSON.stringify({ 'result': 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.logInHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // Log in?
                response.end();
                return [2 /*return*/];
            });
        });
    };
    MyServer.prototype.signUpErrorHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var username, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.theDatabase.isFound_user(username)];
                    case 1:
                        value = _a.sent();
                        if (value) {
                            //alert('Username has been registered!');
                            response.write(JSON.stringify({ 'result': 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.signUpHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var emptyArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        emptyArr = [];
                        return [4 /*yield*/, this.theDatabase.put_user_account(request.body.username, request.body.password, request.body.phone, request.body.email, null, emptyArr)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'sign up',
                            'username': request.body.username,
                            'password': request.body.password,
                            'phone': request.body.phone,
                            'email': request.body.email,
                            'shop_index': null,
                            'activity_array': emptyArr }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.readProfileHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, user, shop, activity, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.theDatabase.get_user(username)];
                    case 1:
                        user = _a.sent();
                        response.write(JSON.stringify({ 'result': 'read profile',
                            'username': username,
                            'alias': user.alias,
                            'portrait_src': user.portrait_src,
                            'location': user.location,
                            'description': user.description,
                            'pet1_name': user.pet1_name,
                            'pet2_name': user.pet2_name,
                            'pet1_src': user.pet1_src,
                            'pet2_src': user.pet2_src }));
                        if (!(user.shop_index !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.theDatabase.get_shop(user.shop_index)];
                    case 2:
                        shop = _a.sent();
                        response.write(JSON.stringify({ 'shop_name': shop.name,
                            'logo': shop.logo_src,
                            'type': shop.type,
                            'address': shop.address,
                            'rate': shop.rate }));
                        _a.label = 3;
                    case 3:
                        if (!(user.activity_array.length !== 0)) return [3 /*break*/, 7];
                        activity = void 0;
                        i = 0;
                        _a.label = 4;
                    case 4:
                        if (!(i < user.activity_array.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.theDatabase.get_activity(user.activity_array[i])];
                    case 5:
                        activity = _a.sent();
                        response.write(JSON.stringify({ 'activity_name': activity.name,
                            'image': activity.image_src,
                            'time': activity.time }));
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 4];
                    case 7:
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.editProfileHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.put_user_profile(request.body.username, request.body.alias, request.body.portrait_src, request.body.location, request.body.description, request.body.pet1_name, request.body.pet2_name, request.body.pet1_src, request.body.pet2_src)];
                    case 1:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'edit profile successfully' }));
                        response.end();
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.shopNotFoundHandler = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var shopID, value;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shopID = request.body.id;
                        return [4 /*yield*/, this.theDatabase.isFound_shop(shopID)];
                    case 1:
                        value = _a.sent();
                        if (!value) {
                            //alert('Shop not Found!');
                            response.write(JSON.stringify({ 'result': 'error' }));
                            response.end();
                        }
                        else {
                            next();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.viewShopHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var shopID, shop, activity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shopID = request.body.shop_id;
                        return [4 /*yield*/, this.theDatabase.get_shop(shopID)];
                    case 1:
                        shop = _a.sent();
                        response.write(JSON.stringify({ 'result': 'view shop',
                            'id': shop.id,
                            'owner': shop.owner,
                            'name': shop.name,
                            'type': shop.type,
                            'open hour': shop.open_hour,
                            'address': shop.address,
                            'phone': shop.phone,
                            'email': shop.email,
                            'url': shop.url,
                            'logo': shop.logo_src,
                            'picture1': shop.pic1_src,
                            'picture2': shop.pic2_src,
                            'picture3': shop.pic3_src,
                            'picture4': shop.pic4_src,
                            'rate': shop.rate,
                            'comment': shop.comment }));
                        if (!(shop.activity_index !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.theDatabase.get_activity(shop.activity_index)];
                    case 2:
                        activity = _a.sent();
                        response.write(JSON.stringify({ 'activity_name': activity.name,
                            'image': activity.image_src,
                            'time': activity.time }));
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.createShopHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, user, newID, emptyArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.theDatabase.get_user(username)];
                    case 1:
                        user = _a.sent();
                        if (!(user.shop_index !== null)) return [3 /*break*/, 2];
                        alert("You already have a shop!");
                        response.end();
                        return [3 /*break*/, 6];
                    case 2: return [4 /*yield*/, this.theDatabase.getNextShopID()];
                    case 3:
                        newID = _a.sent();
                        emptyArr = [];
                        return [4 /*yield*/, this.theDatabase.put_user_shop(username, newID)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.theDatabase.put_shop(newID, username, request.body.name, request.body.type, request.body.open_hour, request.body.address, request.body.phone, request.body.email, request.body.url, request.body.logo_src, request.body.pic1_src, request.body.pic2_src, request.body.pic3_src, request.body.pic4_src, null, 0, 0, emptyArr)];
                    case 5:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'shop created' }));
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.editShopHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var shop;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.theDatabase.get_shop(request.body.shop_id)];
                    case 1:
                        shop = _a.sent();
                        return [4 /*yield*/, this.theDatabase.put_shop(shop.id, shop.owner, request.body.name, request.body.type, request.body.open_hour, request.body.address, request.body.phone, request.body.email, request.body.url, request.body.logo_src, request.body.pic1_src, request.body.pic2_src, request.body.pic3_src, request.body.pic4_src, shop.activity_index, shop.rate, shop.comment)];
                    case 2:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'edit shop successfully' }));
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.deleteShopHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var username, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = request.body.username;
                        return [4 /*yield*/, this.theDatabase.get_user(username)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, this.theDatabase.delete_shop(user.shop_index)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.theDatabase.put_user_shop(username, null)];
                    case 3:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'shop deleted' }));
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.rateShopHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var shopID, shop, curr_rate, rate_number, new_rate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shopID = request.body.shop_id;
                        return [4 /*yield*/, this.theDatabase.get_shop(shopID)];
                    case 1:
                        shop = _a.sent();
                        curr_rate = shop.rate;
                        rate_number = shop.rate_number + 1;
                        new_rate = (curr_rate + request.body.rate) / rate_number;
                        return [4 /*yield*/, this.theDatabase.put_shop_rate(shopID, new_rate, rate_number)];
                    case 2:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'shop rated', 'rate': new_rate }));
                        return [2 /*return*/];
                }
            });
        });
    };
    MyServer.prototype.commentShopHandler = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var shopID, shop, comments;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        shopID = request.body.shop_id;
                        return [4 /*yield*/, this.theDatabase.get_shop(shopID)];
                    case 1:
                        shop = _a.sent();
                        comments = shop.comment;
                        comments.push(request.body.comment);
                        return [4 /*yield*/, this.theDatabase.put_shop_comment(shopID, comments)];
                    case 2:
                        _a.sent();
                        response.write(JSON.stringify({ 'result': 'new comment added', 'comment': comments }));
                        return [2 /*return*/];
                }
            });
        });
    };
    return MyServer;
}());
exports.MyServer = MyServer;
