# Kanboard Kanban by ralfarios. server
Kanboard server is used for Kanboard web application. Kanboard is Digitalize version of Kanban board.

> P.S.: This app is still experimental and for educational purpose, but ofcourse you can use it for your daily driver.

## Feature
 - Create, Read, Update, and Delete your task 

 ## Endpoints
 This table is list of this app's API endpoint. You can see the detail in [API Documentation](https://github.com/Ralfarios/kanban-server/blob/main/API_DOC.md). 

| Route         | Method      | Description                   |
| ------------- | ----------- | ----------------------------- |
| `/register`   | POST        | For register user             |
| `/login`      | POST        | For login user                |
| `/glogin`     | POST        | For login user with Google    |
| `/getuser`    | GET         | For get user information      |
| `/task`       | POST        | For add task to list          |
| `/task`       | GET         | For see task list             |
| `/task/:id`   | GET         | For see detailed              |
| `/task/:id`   | PUT         | For update task               |
| `/task/:id`   | PATCH       | For change status task        |
| `/task/:id`   | DELETE      | For delete task               |
<br>

## Are you dev?
Want to help me to develop this web application? You are very welcome and Let's get started!

Before you start, make sure you already installed [Node.js](https://nodejs.org/en/) on your machine.

### Let's get started

 1. First, all you had to do is clone this repo <br> `$ git clone https://github.com/ralfarios/kanban-server`
 2. Second, go to your `repo`/server directory <br>`$cd kanban-server`
 3. and then, install the packages <br>
 `$ npm install`
 4. Install sequelize-cli and nodemon (global recommended).
 `$ npm install -g sequelize-cli nodemon`
 5. Then, setup the Sequelize database with these commands: 
    - For create the database<br>
    `$ sequelize db:create`
    - For creating the tables and stuff<br>
    `$ sequelize db:migrate`
 5. Remember to fill API KEY on `.env` file (make one if you don't have it, example is on `.env.example` file)
 6. AND YOU GOOD TO GO! 


 ## Executing
After everything is done, let's execute it with `$ npm run dev`.

## Any question?
Feel free to contact me!

## Credit
- [UI-Avatars](https://ui-avatars.com/)
