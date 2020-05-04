import { promises } from "dns";
import { runInNewContext } from "vm";

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
	this.router.post('/log_in', [this.userNotFoundHandler.bind(this), this.passwordIncorrectHandler.bind(this), this.logInHandler.bind(this)]); //done
	this.router.post('/sign_up', [this.signUpErrorHandler.bind(this), this.signUpHandler.bind(this)]); //done

	this.router.post('/home', [this.toBeDefinedError.bind(this), this.toBeDefined.bind(this)]);

	this.router.post('/profile', [this.userNotFoundHandler.bind(this), this.readProfileHandler.bind(this)]);
	this.router.post('/profile_edit', [this.userNotFoundHandler.bind(this), this.editProfileHandler.bind(this), this.readProfileHandler.bind(this)]);

	this.router.post('/shop', [this.shopNotFoundHandler.bind(this), this.viewShopHandler.bind(this)]); //done
	this.router.post('/shop_edit', [this.editShopErrorHandler.bind(this), this.editShopHandler.bind(this), this.viewShopHandler.bind(this)]); //done
	this.router.post('/shop_delete', this.deleteShopHandler.bind(this)); //done

	//this.router.post('/search',[this.shopNotFoundHandler.bind(this),this.viewSearchResultHandler.bind(this)]);
	//for test purpose excluded shopenotfoundhandler
	this.router.post('/search',this.viewSearchResultHandler.bind(this));
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
		next();
	}

	private async toBeDefined(request, response) : Promise<void> {
		response.write(JSON.stringify({'result':'to be defined'}));
		response.end();
	}

	//for customer.html searchbar
	private async viewSearchResultHandler(request,response):Promise<void>{
		console.log("here!");
		let keyword=request.body.shopname;
		let shoptype=request.body.shoptype;
		let shop = await this.theDatabase.serach_shop(keyword,shoptype);
		response.write(JSON.stringify({'result' : 'serach',
	    'name' : shop.name,
		'type' : shop.type,
		'address' : shop.address,
		'phone' : shop.phone,
		'logo' : shop.logo_src,
		'rate' : shop.rate, }));
		response.end();
	}

	private async userNotFoundHandler(request, response, next) : Promise<void> {
		let username = request.body.username;
		console.log("check3: "+username);
		let value : boolean = await this.theDatabase.isFound_user(username);
		console.log(value);
		if(!value){
			//alert('Username not Found!');
			response.write(JSON.stringify({'result' : 'Username not found!'}));
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
			//alert('Password is incorrect!');
			response.write(JSON.stringify({'result' : 'Incorrect Password!'}));
			response.end()
		}
		else {
			next();
		}
	}

	private async logInHandler(request, response) : Promise<void> {
		response.write(JSON.stringify({'result' : 'succeed'}));
		response.end();
	}

	private async signUpErrorHandler(request, response, next) : Promise<void> {
		let username = request.body.username;
		let password = request.body.password;
		let password2 = request.body.password2;
		let value : boolean = await this.theDatabase.isFound_user(username);
		if(username === "") {
			response.write(JSON.stringify({'result' : 'Please enter username.'}));
			response.end();
		}
		else if(password === "") {
			response.write(JSON.stringify({'result' : 'Please enter password.'}));
			response.end();
		}
		else if(password2 === "") {
			response.write(JSON.stringify({'result' : 'Please enter your password again.'}));
			response.end();
		}
		else if(password !== password2) {
			response.write(JSON.stringify({'result' : 'Passwords do not match. Please check your password.'}));
			response.end();
		}
		else if(value){
			response.write(JSON.stringify({'result' : 'Username has been registered!'}));
			response.end();
		}
		else {
			next();
		}
	}

	private async signUpHandler(request, response) : Promise<void> {
		console.log("sign up handler");
		let emptyArr: number[] = [];
		await this.theDatabase.put_user_account(request.body.username, request.body.password, request.body.phone, request.body.email, null, emptyArr);
		response.write(JSON.stringify({'result' : 'succeed',
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
		if(user.shop_index !== null){
			let shop = await this.theDatabase.get_shop(user.shop_index);
			response.write(JSON.stringify({'result' : 'succeed',
			'username' : username,
			'alias' : user.alias,
			'portrait_src' : user.portrait_src, 
			'location' : user.location, 
			'description' : user.description, 
			'pet1_name' : user.pet1_name, 
			'pet2_name' : user.pet2_name , 
			'pet1_src' : user.pet1_src, 
			'pet2_src' : user.pet2_src,
			'shop_name' : shop.name,
			'logo' : shop.logo_src,
			'type' : shop.type,
			'address' : shop.address}));
		}
		else {
			response.write(JSON.stringify({'result' : 'succeed',
			'username' : username,
			'alias' : user.alias,
			'portrait_src' : user.portrait_src, 
			'location' : user.location, 
			'description' : user.description, 
			'pet1_name' : user.pet1_name, 
			'pet2_name' : user.pet2_name , 
			'pet1_src' : user.pet1_src, 
			'pet2_src' : user.pet2_src,
			'shop_name' : null,
			'logo' : null,
			'type' : null,
			'address' : null}));
		}
		response.end();
	}

	private async editProfileHandler(request, response, next) : Promise<void> {
		await this.theDatabase.put_user_profile(request.body.username, 
												request.body.alias, 
												request.body.portrait_src, 
												request.body.location, 
												request.body.description,
												request.body.pet1_name,
												request.body.pet2_name,
												request.body.pet1_src,
												request.body.pet2_src);
		next();
	}

	private async shopNotFoundHandler(request, response, next) : Promise<void> {
		let shop_name = request.body.name;
		console.log("check shop not found error, shop name: " + shop_name);
		let value : boolean = await this.theDatabase.isFound_shop(shop_name);
		if(!value){
			//alert('Shop not Found!');
			response.write(JSON.stringify({'result' : 'Error: Shop Not Found!'}));
			response.end();
		}
		else {
			next();
		}
	}

	private async viewShopHandler(request, response) : Promise<void> {
		let shop_name = request.body.name;
		console.log("view_shop_id:" + shop_name);
		if(shop_name === undefined) {
			let user = await this.theDatabase.get_user(request.body.username);
			shop_name = user.shop_index;
		}
		let shop = await this.theDatabase.get_shop(shop_name);
		response.write(JSON.stringify({'result' : 'succeed',
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
										'picture4' : shop.pic4_src}));
		response.end();
	}

	private async editShopErrorHandler(request, response, next) : Promise<void> {
		let shop_name = request.body.shop_name;
		let open_hour = request.body.open_hour;
		let address = request.body.address;
		let phone = request.body.phone;
		let username = request.body.username;
		let value : boolean = await this.theDatabase.isFound_shop(shop_name);
		let user = await this.theDatabase.get_user(username);
		if(shop_name === "") {
			response.write(JSON.stringify({'result' : 'Please enter shop name.'}));
			response.end();
		}
		else if(open_hour === "") {
			response.write(JSON.stringify({'result' : 'Please select open hour.'}));
			response.end();
		}
		else if(address === "") {
			response.write(JSON.stringify({'result' : 'Please enter address.'}));
			response.end();
		}
		else if(phone === "") {
			response.write(JSON.stringify({'result' : 'Please enter phone number.'}));
			response.end();
		}
		else if(value && user.shop_index !== shop_name) {
			response.write(JSON.stringify({'result' : 'Shop Name has been regiestered. Please change it.'}));
			response.end();
		}
		else {
			next();
		}
	}

	private async editShopHandler(request, response, next) : Promise<void> {
		let shop_name = request.body.shop_name;
		let username = request.body.username;
		let user = await this.theDatabase.get_user(username);

		await this.theDatabase.put_user_shop(username, shop_name);
		await this.theDatabase.put_shop(username, request.body.shop_name, request.body.type, request.body.open_hour,
			request.body.address, request.body.phone, request.body.email, request.body.url, request.body.logo_src,
			request.body.pic1_src, request.body.pic2_src, request.body.pic3_src, request.body.pic4_src);
		next();
	}

	private async deleteShopHandler(request, response) : Promise<void> {
		let username = request.body.username;
		let user = await this.theDatabase.get_user(username);
		console.log("checkpoint");
		await this.theDatabase.delete_shop(user.shop_index);
		await this.theDatabase.put_user_shop(username, null);
		response.write(JSON.stringify({'result' : 'succeed'}));
		response.end();
	}
}

