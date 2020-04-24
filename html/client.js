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
		window.document.location = "./homepage.html";
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
		let result = 'fail';
		if (j['result'] !== 'error') {
			result = 'succeed';
		}
	
		// set data in local storage
		localStorage.setItem('result', 'succeed');
		localStorage.setItem('username', username);

		// redirection
		window.document.location = "./shop.html";    
		})();
}

function counterSignUp() {
	(async () => {
		console.log("Sign up in process.");
		let username = document.getElementById("username").value;
		// TO Do: complete all fields
		/*
		const data = {'username' : username, 'password' : password};
		const newURL = url + "/log_in";
		console.log("counterLogin: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		let result = 'fail';
		if (j['result'] !== 'error') {
			result = 'succeed';
		}
		*/
		// set data in local storage
		localStorage.setItem('result', 'succeed');
		localStorage.setItem('username', username);

		// redirection
		//window.document.location = "./log_in.html";    
		})();
}

function counterShopCancel() {
	(async () => {
		console.log("Shop Edit Cancelled.");
		// set data in local storage
		localStorage.setItem('result', 'cancelled');
		// redirection
		window.document.location = "./shop.html";
		})();
}

function counterShopEdit() {
	(async () => {
		console.log("shop edit in process.");
		let shop_name = document.getElementById("shop name").value;
		// TO Do: complete all fields
		// TO Do: postData
		// set data in local storage
		// TO DO: complete all fields
		localStorage.setItem('result', 'succeed');
		localStorage.setItem('shop_name', shop_name);

		// redirection
		window.document.location = "./shop.html";    
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

function counterProfileEdit() {
	(async () => {
		console.log("Profile edit in process.");
		let username = document.getElementById("alias").value;
		// TO Do: complete all fields
		// TO Do: postData
		// set data in local storage
		// TO DO: complete all fields
		localStorage.setItem('profile_edit_result', 'succeed');
		localStorage.setItem('username', username);  
		})();
}

function counterShopDelete() {
	(async () => {
		console.log("Shop delete in process.");
		let username = document.getElementById("alias").textContent;
		// TO Do: complete all fields
		// TO Do: postData
		// set data in local storage
		// TO DO: complete all fields
		localStorage.setItem('shop_delete_result', 'succeed');
		localStorage.setItem('username', username); 
		// redirection
		window.document.location = "./profile.html";   
		})();
}


/*
function counterCreate() {
    (async () => {
		let counterName = document.getElementById("countername").value;
		let userName = document.getElementById("username").value;
		const data = {'name' : counterName};
		const newURL = url + "/users/" + userName +"/create";
		console.log("counterCreate: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] !== 'error') {
	    	document.getElementById("output").innerHTML = "101: <b>" + userName + ", " + counterName + " created.</b>";
		} else {
	    	document.getElementById("output").innerHTML = "100: " + userName + ", " + counterName + " not found.</b>";
		}
	})();
}

function counterRead() {
    (async () => {
		let counterName = document.getElementById("countername").value;
		let userName = document.getElementById("username").value;
		const data = {'name' : counterName};
		const newURL = url + "/users/" + userName + "/read";
		console.log("counterRead: fetching " + newURL);
		const resp = await postData(newURL, data);
		const j = await resp.json();
		if (j['result'] !== 'error') {
	    	document.getElementById("output").innerHTML = "201: <b>"  + userName + ", " + counterName + " value = " + j['value'] + "</b>";
		} else {
	    	document.getElementById("output").innerHTML = "200: " +  userName + ", " + counterName + " not found.</b>";
		}	    
    })();
}

function counterUpdate() {
    (async () => {
	let counterName = document.getElementById("countername").value;
	let userName = document.getElementById("username").value;
	let counterValue = document.getElementById("countervalue").value;
	const data = {'name' : counterName, 'value' : counterValue};
	const newURL = url + "/users/" + userName + "/update";
	console.log("counterUpdate: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "301: <b>" + userName + ", " + counterName + " value = " + j['value'] + "</b>";
	} else {
	    document.getElementById("output").innerHTML = "300: " + userName + ", " + counterName + " not found.";
	}	    
    })();
}

function counterDelete() {
    (async () => {
	let counterName = document.getElementById("countername").value;
	let userName = document.getElementById("username").value;
	const data = {'name' : counterName};
	const newURL = url + "/users/" + userName + "/delete";
	console.log("counterDelete: fetching " + newURL);
	const resp = await postData(newURL, data);
	const j = await resp.json();
	if (j['result'] !== 'error') {
	    document.getElementById("output").innerHTML = "401: <b>" + userName + ", " + counterName + " deleted.</b>";
	} else {
	    document.getElementById("output").innerHTML = "400: " + userName + ", " + counterName + " not found.</b>";
	}	    
	})();
}
*/