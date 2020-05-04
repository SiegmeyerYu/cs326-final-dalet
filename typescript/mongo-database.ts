import { threadId } from "worker_threads";

export class Database {

    private MongoClient = require('mongodb').MongoClient;
    private uri = "mongodb+srv://guest:guest@cluster0-y0tyl.mongodb.net/test?retryWrites=true&w=majority";
    private client;
	private collection_user : string;
	private collection_shop : string;
    private dbName : string = "dalet";

    constructor(user, shop) {
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
	(async () => {
	    await this.client.connect().catch(err => { console.log(err); });
	})();
    }

	public async put_user_account(username: string, password : string, phone : string, email : string, shop_index : string, activity_array : Array<number>) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_user);
		let result = await collection.updateOne({'username' : username}, { $set : {'password' : password, 'phone' : phone, 'email' : email, 'shop_index' : shop_index, 'activity_index' : activity_array } }, {'upsert' : true} );
		console.log('put_user_account: result = ' + result);
	}

	public async put_user_profile(username: string, alias: string, portrait_src : any, location : string, description : string, pet1_name : string, pet2_name : string, pet1_src : any, pet2_src : any) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_user);
		let result = await collection.updateOne({'username' : username}, { $set : {'alias': alias, 'portrait_src' : portrait_src, 'location' : location, 'description' : description, 'pet1_name' : pet1_name, 'pet2_name' : pet2_name , 'pet1_src' : pet1_src, 'pet2_src' : pet2_src } }, {'upsert' : true} );
		console.log('put_user_profile: result = ' + result);
	}

	public async put_user_shop(username: string, shop_index:string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_user);
		let result = await collection.updateOne({'username' : username}, { $set : {'shop_index':shop_index} } );
		console.log('put_user_shop: result = ' + result);
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

	public async put_shop( owner: string, name: string, type: string, open_hour : string, address: string, phone: string, email: string, url: string, logo_src: any, pic1_src: any, pic2_src: any, pic3_src: any, pic4_src: any) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_shop);
		let result = await collection.updateOne({'owner' : owner}, { $set : { 'name':name, 'type':type, 'open_hour':open_hour, 'address':address, 'phone':phone, 'email':email, 'url':url, 'logo_src':logo_src, 'pic1_src':pic1_src, 'pic2_src':pic2_src, 'pic3_src':pic3_src, 'pic4_src':pic4_src} }, { 'upsert' : true } );
		console.log("put_shop: result = " + result);
	}

	public async get_shop(key: string) {
		let db = this.client.db(this.dbName); 
		let collection = db.collection(this.collection_shop);
		console.log("check get_shop: "+key);
		let result = await collection.findOne({'name' : key });
		console.log("get_shop: returned " + JSON.stringify(result));
		if (result) {
			return result;
		} else {
			return null;
		}
	}

	public async isFound_shop(key: string) : Promise<boolean>  {
		let v = await this.get_shop(key);
		console.log("isFound_shop: result = " + v);
		if (v === null) {
			return false;
		} else {
			return true;
		}
	}

	public async delete_shop(key:string) : Promise<void> {
		let db = this.client.db(this.dbName);
		let collection = db.collection(this.collection_shop);
		let result = await collection.deleteOne({'name' : key });
		console.log("result = " + result);
	}


	//for customer.html searchbar
	public async search_shop(key: string,type:string){
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
		*/
		let result={'result' : 'search',
		'name' : "Petpaw",
		'type' : "Hospital",
		'address' :"123 central ave,Amherst,MA",
		'phone' : "781333-xxxx",
		'logo_src' : "<img alt=\"store\" src=\"./images/cat-example.jpg\">",
		'rate' : "5 stars" }
		return result;
	}

}
