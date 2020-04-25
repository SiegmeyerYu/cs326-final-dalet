import { threadId } from "worker_threads";

export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
    private client;
	private collection_user : string;
	private collection_shop : string;
	private collection_activity : string;
	private shop_next : number = 0;
	private activity_next : number = 0;
    private dbName : string = "dalet";

    constructor(user, shop, activity) {
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
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }

	// Get ID number for new created shop
	// Increment ID number for next shop
	public async getNextShopID() : Promise<number>{
		let result = this.shop_next;
		this.shop_next++;
		return result;
	}

	public async getNextActivityID() : Promise<number>{
		let result = this.activity_next;
		this.activity_next++;
		return result;
	}

	public async put_user_account(username: string, password : string, phone : string, email : string, shop_index : number, activity_array : Array<number>) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_user);
		let result = await collection.updateOne({'username' : username}, { $set : {'password' : password, 'phone' : phone, 'email' : email, 'shop_index' : shop_index, 'activity_index' : activity_array } }, {'upsert' : true} );
		console.log('put_user_account: result = ' + result);
	}

	public async put_user_profile(username: string, alias: string, portrait_src : string, location : string, description : string, pet1_name : string, pet2_name : string, pet1_src : string, pet2_src : string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_user);
		let result = await collection.updateOne({'username' : username}, { $set : {'alias': alias, 'portrait_src' : portrait_src, 'location' : location, 'description' : description, 'pet1_name' : pet1_name, 'pet2_name' : pet2_name , 'pet1_src' : pet1_src, 'pet2_src' : pet2_src } }, {'upsert' : true} );
		console.log('put_user_profile: result = ' + result);
	}

	public async get_user(key: string) {
		let db = this.client.db(this.dbName); 
		let collection = db.collection(this.collection_user);
		let result = await collection.findOne({'username' : key });
		console.log("get_user: returned " + JSON.stringify(result));
		if (result) {
			return result;
		} else {
			return null;
		}
	}


	public async isFound_user(key: string) : Promise<boolean>  {
		let v = await this.get_user(key);
		console.log("isFound_user: result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}

	public async put_shop(id: number, owner: string, name: string, type: string, open_hour : string, address: string, phone: string, email: string, url: string, logo_src: string, pic1_src: string, pic2_src: string, pic3_src: string, pic4_src: string, activity_index : number, rate: number, comment: Array<String>) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_shop);
		let result = await collection.updateOne({'id' : id}, { $set : { 'owner':owner, 'name':name, 'type':type, 'open_hour':open_hour, 'address':address, 'phone':phone, 'email':email, 'url':url, 'logo_src':logo_src, 'pic1_src':pic1_src, 'pic2_src':pic2_src, 'pic3_src':pic3_src, 'pic4_src':pic4_src, 'activity_index':activity_index, 'rate':rate, 'comment':comment} }, { 'upsert' : true } );
		console.log("put_shop: result = " + result);
	}

	public async get_shop(key: number) {
		let db = this.client.db(this.dbName); 
		let collection = db.collection(this.collection_shop);
		let result = await collection.findOne({'id' : key });
		console.log("get_shop: returned " + JSON.stringify(result));
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	public async isFound_shop(key: number) : Promise<boolean>  {
		let v = await this.get_shop(key);
		console.log("isFound_shop: result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}

	public async put_activity(id: number, name:string, image_src:string, time:string, address:string, phone:string, email:string, decription:string, member:Array<String>) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_activity);
		let result = await collection.updateOne({'id' : id}, { $set : { 'name':name, 'image_src':image_src, 'time':time, 'address':address, 'phone':phone, 'email':email, 'decription':decription, 'member':member} }, { 'upsert' : true } );
		console.log("put_activity: result = " + result);
	}

	public async get_activity(key: number) : Promise<string> {
		let db = this.client.db(this.dbName); 
		let collection = db.collection(this.collection_activity);
		let result = await collection.findOne({'id' : key });
		console.log("get_activity: returned " + JSON.stringify(result));
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	public async isFound_activity(key: number) : Promise<boolean>  {
		let v = await this.get_activity(key);
		console.log("isFound_activity: result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}

	//for customer.html searchbar
	public async search_shop(key: string,type:string) {
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
		return true;
	}

	/*
    public async put(key: string, value: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("put: key = " + key + ", value = " + value);
	let result = await collection.updateOne({'name' : key}, { $set : { 'value' : value} }, { 'upsert' : true } );
	console.log("result = " + result);
    }

    public async get(key: string) : Promise<string> {
	let db = this.client.db(this.dbName); 
	let collection = db.collection(this.collectionName);
	console.log("get: key = " + key);
	let result = await collection.findOne({'name' : key });
	console.log("get: returned " + JSON.stringify(result));
	if (result) {
	    return result.value;
	} else {
	    return null;
	}
    }
    
    public async del(key: string) : Promise<void> {
	let db = this.client.db(this.dbName);
	let collection = db.collection(this.collectionName);
	console.log("delete: key = " + key);
	let result = await collection.deleteOne({'name' : key });
	console.log("result = " + result);
    }
    
    public async isFound(key: string) : Promise<boolean>  {
	console.log("isFound: key = " + key);
	let v = await this.get(key);
	console.log("is found result = " + v);
	if (v === null) {
	    return false;
	} else {
	    return true;
	}
	}
	*/
}
