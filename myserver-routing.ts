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
	//// HANDLE OPERATIONS
	this.router.get('/log_in', [this.userNotFoundHandler.bind(this), this.passwordIncorrectHandler.bind(this), this.logInHandler.bind(this)]); //Zhongdong
	this.router.get('/sign_up', [this.signUpErrorHandler.bind(this), this.signUpHandler.bind(this)]); // Zhongdong

	this.router.get('/home', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/search', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);

	this.router.get('/profile', [this.userNotFoundHandler.bind(this), this.readProfileHandler.bind(this)]); // Zhongdong
	this.router.get('/profile_edit', [this.userNotFoundHandler.bind(this), this.editProfileHandler.bind(this)]); // Zhongdong

	this.router.get('/shop', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/shop_create', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/shop_edit', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/shop_delete', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/shop_rate', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/shop_comment', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);

	this.router.get('/activity', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/act_create', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/act_edit', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/act_delete', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/act_join', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);
	this.router.get('/act_quit', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);

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
		let username = request.query.username;
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
		let username = request.query.username;
		let password = request.query.password;
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
		let username = request.query.username;
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
		await this.theDatabase.put_user_account(request.query.username, request.query.password, request.query.phone, request.query.email, null, emptyArr);
		response.write(JSON.stringify({'result' : 'created',
				       	'username' : request.query.username,
					   	'password' : request.query.password,
						'phone' : request.query.phone,
						'email' : request.query.email,
						'shop_index' : null,
						'activity_array' : null}));
		response.end();
	}

	private async readProfileHandler(request, response) : Promise<void> {
		let username = request.query.username;
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
		await this.theDatabase.put_user_profile(request.query.username, 
												request.query.alias, 
												request.query.portrait_src, 
												request.query.location, 
												request.query.description,
												request.query.pet1_name,
												request.query.pet2_name,
												request.query.pet1_src,
												request.query.pet2_src);
		response.end();
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

