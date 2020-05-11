# File_Sharing_System

File Sharing Web App to share files like images,pdf with your friends in the college using Nodejs,MongoDb,Bootstrap !!

## How To Run?

To run this website run this command on command prompt on root folder.

```
npm start or node app.js
```

It will run under the url http://127.0.0.1:3000/

## Login Details

Email and Password for Website:<br>

Admin :<br>
Email :admin@cq.com<br>
Password: admincq<br>

User:<br>
Email : bro@gmail.com<br>
Password: admincq<br>

## Features
<ul>
  <li> Mongoose Database</li>
  <li>Different View For User And Admin</li> 
  <li>Send Files using Multer</li>
  <li>Different Files can be shared</li>
  <li>Seprate View for records of send files</li>
  <li>Seprate View for records of received files</li>
</ul>

## How to Use ?
<ol type="number">
<li> Use mongorestore command to add database to your Local Machine.</li>
<li>Install Node Modules by running npm install</li>
<li>Run Mongo Server</li>
<li>Run Server File app.js</li>
<li>Run local host on port number 8000</li>
<li>Login using admin id or user id (For id and password see database)</li>
</ol>

## Pre-requisites

- Node JS (Tested on v12.14.0)
- Mongoose
- Pre-requisites or Dependencies(Below)

## Dependencies :

<ul>
  <li>Mongoose</li>
  <li>Express</li>
  <li>Express-Session</li>
  <li>EJS</li>
  <li>Multer</li>
  <li>Bcrypt Module</li>
</ul>

- Express

```
npm install express
```

- EJS

```
npm install ejs
```

- Express-Session

```
npm install express-session
```

- Multer

```
npm install multer
```

- Mongoose

```
npm install mongoose
```

- Dotenv

```
npm install dotenv
```

- Bcrypt

```
npm install bcrypt  / npm i bcrypt
```

## Schema

<h4><b>User Schema</b></h4>

| Name         | Type   | Required | Unique | Encrpyted |
| ------------ | ------ | -------- | ------ | --------- |
| Name         | String | Yes      | No     | No        |
| Email        | String | Yes      | Yes    | No        |
| Password     | String | Yes      | No     | Yes       |
| Phone No.    | String | Yes      | No     | No        |
| City         | String | Yes      | No     | No        |
| Gender       | String | Yes      | No     | No        |
| DOB          | String | Yes      | No     | No        |
| Role         | String | Yes      | No     | No        |
| Status       | String | Yes      | No     | No        |
| Photoname    | String | No       | No     | No        |
| Flag         | String | No       | No     | No        |

<h4><b>File Schema</b></h4>

| Name          | Type   |
| ------------- | ------ |
| From          | String |
| To            | String |
| Message       | String |
| FileName      | String |
| OriginalName  | String |
| Type          | String |
| EntryDate     | String |


## Directory

```bash
|___ Root
|   |--- app.js
|   |
|   |--- Controller
|   |    |--- admin.js
|   |    |--- login.js
|   |    |--- user.js
|   |
|   |--- Dump (Mongoose Dump) (Dump)
|   |
|   |--- Middlewares
|   |    |--- auth.js
|   |    |--- multer.js
|   |
|   |--- Models
|   |    |--- FileSchema.js
|   |    |--- UserSchema.js
|   |
|   |--- Public
|   |    |--- css (Static)
|   |    |--- images (Staic)
|   |    |--- script (Static)
|   |
|   |--- Routes
|   |    |--- Handlers
|   |    |    |--- admin.ejs
|   |    |    |--- login.ejs
|   |    |    |--- user.ejs
|   |    |--- index.js
|   |
|   |--- viwes
|   |    |--- layout
|   |    |    |--- layout.ejs
|   |    | 
|   |    |--- partials
|   |    |    |--- header.ejs
|   |    |    |--- side-navbar.ejs
|   |    |    |--- top-navbar.ejs
|   |    | 
|   |    |--- addUser.ejs
|   |    |--- allFiles.ejs
|   |    |--- changePassword.ejs
|   |    |--- dashboard.ejs
|   |    |--- index.ejs
|   |    |--- newProfileUpdate.ejs
```
