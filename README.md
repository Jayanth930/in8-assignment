
## About The Project
 As stated in the assignment it contains all four basic CRUD api's

### Getting Started

 For this project Node , npm should be installed in your computer
 
 For Node installation , Refer : [Node Installation Guide](https://nodejs.org/en/download/source-code)
 
  Verify the Node and npm installation with 
  ```sh
  node --version
  ```
  ```sh
  npm  --version 
  ```
If you face difficulty with Nodejs Installtion Refer
[Medium trouble shooting Guide](https://medium.com/@asiandigitalhub/troubleshooting-installation-issues-for-node-js-40ef0261e54c)

### Setting Up the Project
1. Clone the Repo
```sh
git clone https://github.com/Jayanth930/in8-assignment
```
2. Install the dependencies
```sh
npm install 
```
3. Setup dotenv
```sh
touch .env
```
* Add PORT = 3500 in .env file
* Add DATABASE_URL="postgresql://postgres:password@localhost:5432/databasename?schema=public"
* password = write your local password of PostgreSQL
* databasename = create a database in your local system of postgresSQL
* It can be any Database Url(postgreSQL) not only local as long as you have the DATABASE_URL and database setup 

4. Setup PosrgreSQL db by running
```sh 
npm run migrate:dev
```
* The above script initializes and applies migrations or  creates schema in PosrgreSQL
5. Now install the prisma client by running
```sh
npm i @prisma/client
```
* when you ran npm run migrate:dev prisma itself suggests you to install the prisma-client
5. Now run the server 
```sh
npm run start 
```
6. Also you can prisma studio to quickly cheup / validate the apis
```sh
npx prisma studio
```
* This can be used to vizualize the database on the Url : [http://localhost:5555](http://localhost:5555)

### Trouble Shooting Guide
* The major problem might arise would be due to verison problem and also with global packages verion vs local package version
* In that regard one issue I faced was due to verison difference between global and local typescript version , so if any issues faced regarding setup , its better to uninstall global typescript package.

### Available API End points

API : Register a New User  
METHOD : **POST**  
ENDPOINT : http://localhost:3500/api/v1/user/register    
Content-Type : application/json  
{  
    &nbsp; &nbsp; &nbsp; "firstName" : "Your first Name",  
    &nbsp; &nbsp; &nbsp; "lastName" : "Your Last Name",  
    &nbsp; &nbsp; &nbsp; "email" : "Your Email",  
    &nbsp; &nbsp; &nbsp; "password" : "any password"  
    &nbsp; &nbsp; &nbsp; "phoneNo" : "any phoneNo"  
    &nbsp; &nbsp; &nbsp; "dateOfBirth" : "yyyy-mm-dd / yyyy/mm/dd"  
    &nbsp; &nbsp; &nbsp; "liniedInUrl" : "any link"  
    &nbsp; &nbsp; &nbsp; "gitHubLink" : "any github url"  
}
* linkedInUrl & gitHubLink are optional
* Make sure you use the given (fieldNames) as it is.
* I havenot made a check on linkedInUrl and gitHubLink cause mostly they will be validated as on frontend.
---

API : Get a Prticular user based on Email  
METHOD : **GET**  
ENDPOINT : http://localhost:3500/api/v1/user/:email 

---

API : Update an Existing User details
METHOD : **PUT**  
ENDPOINT : http://localhost:3500/api/v1/user/:id  
id : UUID {You can get that from GET an user from email}  
Content-Type : application/json  
{    
  &nbsp; &nbsp;  "linkedInUrl" : "https://www.linkedin.com/in/jayanth-kambhampati-jk/",  
&nbsp; &nbsp; "gitHubLink" : "https://github.com/Jayanth930"  
}
* You can update any of the details with fieldNames as given in POST API

---

API : DELETE a user based on id 
METHOD : **DELETE**  
ENDPOINT : http://localhost:3500/api/v1/user/:id