# Group Dalet

# API

/log_in : allows user to log in.

/sign_up : allows user to sign up.

/home : homepage.

/search : allows user to search shops.

/profile : shows user's personal profile.

/profile_edit : allows user to edit his/her personal profile.

/shop : shows a shop's webpage.

/shop_create : allows user to create his/her own shop.

/shop_edit : allows user to edit his/her own shop.

/shop_delete : allows user to delete his/her own shop.

/shop_rate : allows user to rate a shop.

/shop_comment : allows user to comment a shop.

/activity : shows a activity's webpage.

/act_create : allows uer to create an activity.

/act_edit : allows host to edit an activity.

/act_delete : allows host to delete an activity.

/act_join : allows guest to join an activity.

/act_quit : allows guest to quit an activity.

# Screenshots

Take shop as example:

Read:
![alt shop 1](./images/mt2_shop_1.png)
![alt shop 2](./images/mt2_shop_2.png)

Create & Update:<br>
We use the same webpage shop_edit.html to process these two function. (PS: There is some Chinese shown on the screenshot which is due to the language setting of browser, so if you are using English in your browser, they will be in English. These buttons are used to upload pictures.)
![alt shop edit 1](./images/mt2_shop_edit_1.png)
![alt shop edit 2](./images/mt2_shop_edit_2.png)

If the user clicks "Save Changes", then the browser will go back to the shop page, showing one message at bottom "101: shop XXX edited successfully" or "100: shop XXX not found." Else if the user clicks "Cancel", then the browser goes back to the shop page with no message.

![alt shop edit 3](./images/mt2_shop_edit_3.png)

Delete:<br>
Since a shop could only be deleted by its owner, so we decide to add this function in a user's profile. If the user clicks "Delete Shop" then it gives a message "201: XXX's shop is deleted successfully."

![alt shop delete](./images/mt2_shop_delete.png)


# Heroku URL
https://fast-sea-42002.herokuapp.com

# Appologize

We still had some problem on heroku deployment, so if you want to try the link but find application error on it, you may undo the changes for deployment:
1. change the variable **url** in **client.js** to **"http://localhost:8080/dalet"**, 
2. set the parameter of server.listen() in **server-main.js** to **8080**, 
3. take TypeCripts out to the main directory, 
4. run the server by command **ts-node --prefer-ts-exts server-main.ts** (like what we do in in-class exercise), 
5. navigate the browser to **localhost:8080**. 

We are still trying on the heroku things. Sorry about this.


# laber division

Chuyang Zhong - homepage, customer, and heroku deployment

Zhongdong Yu - shop, profile, and heroku deployment

Zhou Xie - shop, activity, and milestone2.md
