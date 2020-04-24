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
 function starnumber(){
console.log("checkstarrate :"+document.getElementById("starRate").value);

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
if (j['result'] !== 'error') {
	document.getElementById("output").innerHTML += "201:"+ "<b>"+j['logo']+"</b>"+"<b>" +"Shopname: "+j['name'] + "</b> " +
	"<b>"+"type: " +j['type']+ "</b>" +
	"<b> "+"address: " + j['address'] + "</b>"+
	"<b>"+"phone: "+j['phone']+"</b>";
} else {
	document.getElementById("output").innerHTML = "200: not found.</b>";
}	    
			
	  
		
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