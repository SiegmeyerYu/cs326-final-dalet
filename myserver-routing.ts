let http = require('http');
let url = require('url');
let express = require('express');

export class MyServer {

    private theDatabase;

    // Server stuff: use express instead of http.createServer
    private server = express();
    private port = 8080;
    private router = express.Router();

    constructor(db) {
	this.theDatabase = db;
	// from https://enable-cors.org/server_expressjs.html
	this.router.use((request, response, next) => {
	    response.header('Content-Type','application/json');
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
	this.router.post('/search', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);

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

	// Set a fall-through handler if nothing matches.
	this.router.post('*', async (request, response) => {
	    response.send(JSON.stringify({ "result" : "command-not-found" }));
	});

	// Start up the endpoint at '/dalet'.
	this.server.use('/dalet', this.router);
    }
	
	public listen(port) : void  {
		this.server.listen(port);
	}

	private async toBeDefinedError(request, response, next) : Promise<void> {
	}

	private async toBeDefined(request, response) : Promise<void> {
	}

	private async userNotFoundHandler(request, response, next) : Promise<void> {
		let username = request.body.username;
		let value : boolean = await this.theDatabase.isFound_user(username);
		if(!value){
			alert('Username not Found!');
			response.write(JSON.stringify({'result' : 'error'}));
			response.end();
		}
		else {
			next();
		}
	}

	private async passwordIncorrectHandler(request, response, next) : Promise<void> {
		let username = request.body.username;
		let password = request.body.password;
		let user = await this.theDatabase.get_user(username);
		if(user.password !== password) {
			alert('Password is incorrect!');
			response.write(JSON.stringify({'result' : 'error'}));
			response.end()
		}
		else {
			next();
		}
	}

	private async logInHandler(request, response) : Promise<void> {
		// Log in?
		response.end();
	}

	private async signUpErrorHandler(request, response, next) : Promise<void> {
		let username = request.body.username;
		let value : boolean = await this.theDatabase.isFound_user(username);
		if(value){
			alert('Username has been registered!');
			response.write(JSON.stringify({'result' : 'error'}));
			response.end();
		}
		else {
			next();
		}
	}

	private async signUpHandler(request, response) : Promise<void> {
		let emptyArr: number[] = [];
		await this.theDatabase.put_user_account(request.body.username, request.body.password, request.body.phone, request.body.email, null, emptyArr);
		response.write(JSON.stringify({'result' : 'sign up',
				       	'username' : request.body.username,
					   	'password' : request.body.password,
						'phone' : request.body.phone,
						'email' : request.body.email,
						'shop_index' : null,
						'activity_array' : emptyArr}));
		response.end();
	}

	private async readProfileHandler(request, response) : Promise<void> {
		let username = request.body.username;
		let user = await this.theDatabase.get_user(username);
		response.write(JSON.stringify({'result' : 'read profile',
				    	'username' : username,
						'alias' : user.alias,
						'portrait_src' : user.portrait_src, 
						'location' : user.location, 
						'description' : user.description, 
						'pet1_name' : user.pet1_name, 
						'pet2_name' : user.pet2_name , 
						'pet1_src' : user.pet1_src, 
						'pet2_src' : user.pet2_src }));
		if(user.shop_index !== null){
			let shop = await this.theDatabase.get_shop(user.shop_index);
			response.write(JSON.stringify({'shop_name' : shop.name,
						'logo' : shop.logo_src,
						'type' : shop.type,
						'address' : shop.address,
						'rate' : shop.rate }));
		}
		if(user.activity_array.length !== 0) {
			let activity;
			for(let i = 0; i < user.activity_array.length; i++){
				activity = await this.theDatabase.get_activity(user.activity_array[i]);
				response.write(JSON.stringify({'activity_name' : activity.name,
						'image' : activity.image_src,
						'time' : activity.time }));
			}
		}
		response.end();
	}

	private async editProfileHandler(request, response) : Promise<void> {
		await this.theDatabase.put_user_profile(request.body.username, 
												request.body.alias, 
												request.body.portrait_src, 
												request.body.location, 
												request.body.description,
												request.body.pet1_name,
												request.body.pet2_name,
												request.body.pet1_src,
												request.body.pet2_src);
		response.write(JSON.stringify({'result' : 'edit profile successfully'}));
		response.end();
	}



	private async shopNotFoundHandler(request, response, next) : Promise<void> {
		let shopID = request.body.id;
		let value : boolean = await this.theDatabase.isFound_shop(shopID);
		if(!value){
			alert('Shop not Found!');
			response.write(JSON.stringify({'result' : 'error'}));
			response.end();
		}
		else {
			next();
		}
	}

	private async viewShopHandler(request, response) : Promise<void> {
		let shopID = request.body.shop_id;
		let shop = await this.theDatabase.get_shop(shopID);
		response.write(JSON.stringify({'result' : 'view shop',
										'id' : shop.id,
										'owner' : shop.owner,
										'name' : shop.name,
										'type' : shop.type,
										'open hour' : shop.open_hour,
										'address' : shop.address,
										'phone' : shop.phone,
										'email' : shop.email,
										'url' : shop.url,
										'logo' : shop.logo_src,
										'picture1' : shop.pic1_src,
										'picture2' : shop.pic2_src,
										'picture3' : shop.pic3_src,
										'picture4' : shop.pic4_src,
										'rate' : shop.rate,
										'comment' : shop.comment }));
		if(shop.activity_index !== null) {
			let activity = await this.theDatabase.get_activity(shop.activity_index);
			response.write(JSON.stringify({'activity_name' : activity.name,
											'image' : activity.image_src,
											'time' : activity.time }));
		}
	}

	private async createShopHandler(request, response) : Promise<void> {
		let username = request.body.username;
		let user = await this.theDatabase.get_user(username);
		if(user.shop_index !== null){
			alert("You already have a shop!");
			response.end();
		} else {
			let newID = await this.theDatabase.getNextShopID();
			let emptyArr: String[] = [];
			await this.theDatabase.put_user_shop(username, newID);
			await this.theDatabase.put_shop(newID, username, request.body.name, request.body.type, request.body.open_hour,
				request.body.address, request.body.phone, request.body.email, request.body.url, request.body.logo_src,
				request.body.pic1_src, request.body.pic2_src, request.body.pic3_src, request.body.pic4_src,
				null, 0, 0, emptyArr);
			response.write(JSON.stringify({'result' : 'shop created'}));
		}
	}

	private async editShopHandler(request, response) : Promise<void> {
		let shop = await this.theDatabase.get_shop(request.body.shop_id);
		await this.theDatabase.put_shop(shop.id, shop.owner, request.body.name, request.body.type, request.body.open_hour,
			request.body.address, request.body.phone, request.body.email, request.body.url, request.body.logo_src,
			request.body.pic1_src, request.body.pic2_src, request.body.pic3_src, request.body.pic4_src,
			shop.activity_index, shop.rate, shop.comment);
		response.write(JSON.stringify({'result' : 'edit shop successfully'}));
	}

	private async deleteShopHandler(request, response) : Promise<void> {
		let username = request.body.username;
		let user = await this.theDatabase.get_user(username);
		await this.theDatabase.delete_shop(user.shop_index);
		await this.theDatabase.put_user_shop(username, null);
		response.write(JSON.stringify({'result' : 'shop deleted'}));
	}

	private async rateShopHandler(request, response) : Promise<void> {
		let shopID = request.body.shop_id
		let shop = await this.theDatabase.get_shop(shopID);
		let curr_rate = shop.rate;
		let rate_number = shop.rate_number + 1;
		let new_rate = (curr_rate + request.body.rate)/rate_number;
		await this.theDatabase.put_shop_rate(shopID, new_rate, rate_number);
		response.write(JSON.stringify({'result' : 'shop rated', 'rate' : new_rate}));
	}

	private async commentShopHandler(request, response) : Promise<void> {
		let shopID = request.body.shop_id
		let shop = await this.theDatabase.get_shop(shopID);
		let comments = shop.comment;
		comments.push(request.body.comment);
		await this.theDatabase.put_shop_comment(shopID, comments);
		response.write(JSON.stringify({'result' : 'new comment added', 'comment' : comments}));
	}

	/*

	private async errorHandler(request, response, next) : Promise<void> {
	let value : boolean = await this.theDatabase.isFound(request.params['userId']+"-"+request.query.name);
	if (!value) {
	    response.write(JSON.stringify({'result' : 'error'}));
	    response.end();
	} else {
	    next();
	}
	}
	
    private async createHandler(request, response) : Promise<void> {
	await this.createCounter(request.params['userId']+"-"+request.query.name, response);
    }

    private async readHandler(request, response): Promise<void> {
	await this.readCounter(request.params['userId']+"-"+request.query.name, response);
    }

    private async updateHandler(request, response) : Promise<void> {
	await this.updateCounter(request.params['userId']+"-"+request.query.name, parseInt(request.query.value), response);
    }

    private async deleteHandler(request, response) : Promise<void> {
	await this.deleteCounter(request.params['userId']+"-"+request.query.name, response);
    }

    public listen(port) : void  {
	this.server.listen(port);
    }

    public async createCounter(name: string, response) : Promise<void> {
	console.log("creating counter named '" + name + "'");
	await this.theDatabase.put(name, 0);
	response.write(JSON.stringify({'result' : 'created',
				       'name' : name,
				       'value' : 0 }));
	response.end();
    }

    public async errorCounter(name: string, response) : Promise<void> {
	response.write(JSON.stringify({'result': 'error'}));
	response.end();
    }

    public async readCounter(name: string, response) : Promise<void> {
	let value = await this.theDatabase.get(name);
	response.write(JSON.stringify({'result' : 'read',
				       'name' : name,
				       'value' : value }));
	response.end();
    }

    public async updateCounter(name: string, value: number, response) : Promise<void> {
	await this.theDatabase.put(name, value);
	response.write(JSON.stringify({'result' : 'updated',
				       'name' : name,
				       'value' : value }));
	response.end();
    }
    
    public async deleteCounter(name : string, response) : Promise<void> {
	await this.theDatabase.del(name);
	response.write(JSON.stringify({'result' : 'deleted',
				       'value'  : name }));
	response.end();
	}
	*/
}

