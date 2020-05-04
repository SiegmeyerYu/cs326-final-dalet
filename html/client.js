const url = "http://localhost:8080/dalet";

async function postData(url, data) {
    const resp = await fetch(url,
                             {
                                 method: 'POST',
                                 mode: 'cors',
                                 cache: 'no-cache',
                                 credentials: 'same-origin',
                                 headers: {
                                     'Content-Type': 'application/json'
                                 },
                                 redirect: 'follow',
                                 body: JSON.stringify(data)
                             });
    return resp;
}

function counterLoginCancel() {
	(async () => {
		console.log("Log in Cancelled.");
		// set data in local storage
		localStorage.setItem('result', 'cancelled');
		// redirection
		window.document.location = "./index.html";
		})();
}

function counterLogin() {
	(async () => {
		console.log("Log in.");
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;
		const data = {'username' : username, 'password' : password};
		const newURL = url + "/log_in";
		console.log("counterLogin: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		let result = j['result'];
		if (result === 'succeed') {
			// set data in local storage
			localStorage.setItem('result', result);
			localStorage.setItem('username', username);
			// redirection
			window.document.location = "./index.html";
		}
		else {
			document.getElementById("err_message").innerHTML = result;
		}
		})();
}

function counterSignUp() {
	(async () => {
		console.log("Sign up in process.");
		// get data from html
		let username = document.getElementById("username").value;
		let password = document.getElementById("password").value;
		let password2 = document.getElementById("password2").value;
		let phone = document.getElementById("phone").value;
		let email = document.getElementById("email").value;
		// process data and build url
		const data = {'username' : username, 'password' : password, 'password2':password2, 'phone':phone, 'email':email};
		const newURL = url + "/sign_up";
		console.log("counterLogin: fetching " + newURL);
		// post data to database
		const resp = await postData(newURL, data);
		const j = await resp.json();
		let result = j['result'];
		if (result === 'succeed') {
			localStorage.setItem('result', result);
			localStorage.setItem('username', username);  
			// redirection
			window.document.location = "./index.html"; 
		}
		else {
			document.getElementById("err_message").innerHTML = result;
		}
		})();
}

function counterShopCancel() {
	(async () => {
		console.log("Shop Edit Cancelled.");
		// set data in local storage
		localStorage.setItem('result', 'cancelled');
		// redirection
		window.document.location = "./index.html";
		})();
}

function counterShopRead() {
	(async () => {
		let shop_id = document.getElementById("shop_id").value;
		const data = {'shop_id' : shop_id};
		const newURL = url + "/shop";
		console.log("counterLogin: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] === 'succeed') {
			localStorage.setItem('shop_name', j['name']);
			localStorage.setItem('shop_image', j['logo']);
			localStorage.setItem('shop_type', j['type']);
			localStorage.setItem('open_hour', j['open hour']);
			localStorage.setItem('address', j['address']);
			localStorage.setItem('phone', j['phone']);
			localStorage.setItem('email', j['email']);
			localStorage.setItem('outside_url', j['url']);
			localStorage.setItem('pic1', j['picture1']);
			localStorage.setItem('pic2', j['picture2']);
			localStorage.setItem('pic3', j['picture3']);
			localStorage.setItem('pic4', j['picture4']);
			// redirection
			window.document.location = "./shop.html";
		}
		else {
			console.log("Read Shop Fail");
		}
		})();
}

function counterShopEdit() {
	(async () => {
		console.log("shop edit in process.");
		let username = localStorage.getItem('username');
		let shop_name = document.getElementById("shop name").value;
		let shop_image = document.getElementById("shop image").value;
		let shop_type = document.getElementById("shop type").value;
		let open_hours_start = document.getElementById("open hours start").value;
		let open_hours_end = document.getElementById("open hours end").value;
		let open_hour = open_hours_start + ' to ' + open_hours_end;
		let address = document.getElementById("address").value;
		let phone = document.getElementById("phone").value;
		let email = document.getElementById("email").value;
		let outside_url = document.getElementById("url").value;
		let pic1 = document.getElementById("pic1").value;
		let pic2 = document.getElementById("pic2").value;
		let pic3 = document.getElementById("pic3").value;
		let pic4 = document.getElementById("pic4").value;
		// process data and build url
		const data = {'username' : username, 'shop_name':shop_name,'logo_src':shop_image, 'type':shop_type, 'open_hour':open_hour, 'address':address, 'phone':phone, 'email':email,
			'url':outside_url, 'pic1_src':pic1, 'pic2_src':pic2, 'pic3_src':pic3, 'pic4_src':pic4};
		const newURL = url + "/shop_edit";
		console.log("counterLogin: fetching " + newURL);
		// post data to database
		const resp = await postData(newURL, data);
		const j = await resp.json();
		let result = j['result'];
		if (result === 'succeed') {
			// set data in local storage
			localStorage.setItem('shop_name', shop_name);
			localStorage.setItem('shop_image', shop_image);
			localStorage.setItem('shop_type', shop_type);
			localStorage.setItem('open_hour', open_hour);
			localStorage.setItem('address', address);
			localStorage.setItem('phone', phone);
			localStorage.setItem('email', email);
			localStorage.setItem('outside_url', outside_url);
			localStorage.setItem('pic1', pic1);
			localStorage.setItem('pic2', pic2);
			localStorage.setItem('pic3', pic3);
			localStorage.setItem('pic4', pic4);
			// redirection
			window.document.location = "./shop.html";  
		}
		else {
			document.getElementById("err_message").innerHTML = result;
		} 
		})();
}

function counterShopDelete() {
	(async () => {
		console.log("Shop delete in process.");
		let username = localStorage.getItem('username');
		const data = {'username':username};
		const newURL = url + "/shop_delete";
		console.log("counterLogin: fetching " + newURL);
		// post data to database
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] === 'succeed') {
			localStorage.setItem('shop_name', 'null');
			// redirection
			window.document.location = "./profile.html";
		}
		})();
}


function counterProfileCancel() {
	(async () => {
		console.log("Shop Edit Cancelled.");
		// set data in local storage
		localStorage.setItem('profile_edit_result', 'cancelled');
		// redirection
		window.document.location = "./profile.html";
		})();
}

function counterProfileRead() {
	(async () => {
		let username = document.getElementById("username*").textContent;
		console.log("check2: "+username);
		const data = {'username' : username};
		const newURL = url + "/profile";
		console.log("counterLogin: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] === 'succeed') {
			localStorage.setItem('result', 'succeed');
			localStorage.setItem('alias', j['alias']);
			localStorage.setItem('portrait_src', j['portrait_src']);
			localStorage.setItem('location', j['location']);
			localStorage.setItem('description', j['description']);
			localStorage.setItem('pet1_name', j['pet1_name']);
			localStorage.setItem('pet2_name', j['pet2_name']);
			localStorage.setItem('pet1_src', j['pet1_src']);
			localStorage.setItem('pet2_src', j['pet2_src']);
			localStorage.setItem('shop_name', j['shop_name']);
			localStorage.setItem('logo', j['logo']);
			localStorage.setItem('type', j['type']);
			localStorage.setItem('address', j['address']);
			// redirection
			window.document.location = "./profile.html";
		}
		else {
			console.log("Read Profile fail.");
		}
		})();
}

function counterProfileEdit() {
	(async () => {
		console.log("Profile edit in process.");
		let username = localStorage.getItem("username");
		let alias = document.getElementById("alias").value;
		let location = document.getElementById("location").value;
		let portrait = document.getElementById("portrait").value;
		let description = document.getElementById("description").value;
		let pet1n = document.getElementById("pet1n").value;
		let pet1i = document.getElementById("pet1i").value;
		let pet2n = "";
		let pet2i = "";
		const data = {'username':username, 'alias':alias, 'portrait_src':portrait, 'location':location, 'description':description, 
			'pet1_name':pet1n, 'pet2_name':pet2n, 'pet1_src':pet1i, 'pet2_src':pet2i};
		const newURL = url + "/profile_edit";
		console.log("counterLogin: fetching " + newURL);
		// post data to database
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] === 'succeed') {
			localStorage.setItem('profile_edit_result', 'succeed');
			localStorage.setItem('alias', alias);  
			localStorage.setItem('portrait_src', portrait);
			localStorage.setItem('location', location);
			localStorage.setItem('description', description);
			localStorage.setItem('pet1_name', pet1n);
			localStorage.setItem('pet2_name', pet2n);
			localStorage.setItem('pet1_src', pet1i);
			localStorage.setItem('pet2_src', pet2i);
			localStorage.setItem('shop_name', j['shop_name']);
			localStorage.setItem('logo', j['logo']);
			localStorage.setItem('type', j['type']);
			localStorage.setItem('address', j['address']);
			// redirection
			window.document.location = "./profile.html";
		}
		else {
			console.log("Edit Profile fail.");
		}
		})();
}


function searchShop() {
    (async () => {
		let searchKeyword=document.getElementById("keyword").value;
		let searchType=document.getElementById("dropdown_type").value;
		const data={'shopname':searchKeyword,
					'shoptype':searchType
					};		
		const newURL = url+"/search";
		console.log("searchShop: fetching " + newURL);
		const resp = await postData(newURL,data);
		const j = await resp.json();	
	//	if (j['result'] !== 'error') {
		document.getElementById("output").innerHTML +=j['logo']+"<br>"+
		"Shopname: "+"<b>"+j['name']+"</b>"+"<br>"+
		"Type: 	   "+"<b>"+j['type']+"</b>"+"<br>" +
		"Address:  "+"<b>"+j['address']+"</b>"+"<br>"+
		"Phone:    "+"<b>"+j['phone']+"</b>"+"<br>"+
		"<input type=\"button\" onclick=\"location.href='https://google.com';\" value=\"select\" class=\"button\"/>";
			
	}	)();
}
