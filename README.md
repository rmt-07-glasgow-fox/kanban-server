# kanban-server
> ### **Feature**
- [x] Rest API PostgreSQL + Sequelize
- [x] API Documentation
- [x] Auth 
- [x] User login, register and get info
- [x] CRUD Task 
- [x] CRUD Category 
- [x] API Documentation
- [x] Association models 
- [x] Google Auth
- [x] heroku-server
- [x] firebase-client

> ### **🚀 Rocket**
- [x] Dynamic Category 

> ### **Deploy**
> Heroku Server 
- >https://kanban-skh.herokuapp.com/
> Firebase Client
- >https://green-kanban.web.app/

> ### **.env**
- >SECRET_KEY="jwt secret"
- >GOOGLE_CLIENT_ID="input your google client id"
- >GOOGLE_SECRET="input your secret"

### API LIST
| ROUTES         | METHODS | DESCRIPTION                    |
|----------------|---------|--------------------------------|
| `/tasks`       | POST    | In Need To add tasks           |
| `/tasks`       | GET     | In Need To see tasks           |
| `/tasks/:id`   | GET     | In Need To see value           |
| `/tasks/:id`   | PUT     | In Need To update tasks        |
| `/tasks/:id`   | PATCH   | In Need To change categoryId   |
| `/tasks/:id`   | DELETE  | In Need To delete tasks        |
| `/category`    | POST    | In Need To add category        |
| `/category`    | GET     | In Need To see category        |
| `/category/:id`| GET     | In Need To see value           |
| `/category/:id`| PUT     | In Need To update category     |
| `/category/:id`| DELETE  | In Need To delete category     |
| `/register`    | POST    | In Need To register user       |
| `/login`       | POST    | In Need To login user          |
| `/loginGoogle` | POST    | In Need To google login        |
| `/user`        | GET     | In Need To get user list       |


### ERROR RESPONSE 
| STATUS |       ERROR DESC                 |
|--------|-------------------------         |
|   400  | SequelizeDatabaseError           |
|   401  | InvalidUser                      |
|   400  | SequelizeUniqueConstraintError   |
|   404  | ResourceNotFound                 |
|   400  | SequelizeValidationError         |
|   500  | "detailed err name"              |

### GUIDE
1. Clone this Repository
2. Install package based on package.json
3. create `.env` file with value that i mention in description 
5. Sequelize migrate
4. start node with `npm run dev`

-------
**POST /login**
----
 Login into app.

* **URL**

  /login

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ```
    {
        "email": "<input email>",
        "password": "<input password>",
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "access_token": "<given by system>",
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-----
**POST /register**
----
 register into app.

* **URL**

  /register

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ```
    {
        "email": "<input email>",
        "password": "<input password>",
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "email": "<email inputed>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
**POST /loginGoogle**
----
 Login into app.

* **URL**

  /loginGoogle

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ``` json
    {
        "id_token": "<token from OauthClient>",
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "access_token": "<given by system>",
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------


**GET /user**
----
  Returns json data user.

* **URL**

  /user

* **Method:**

  `GET`
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "email": "<email from db>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------

**POST /tasks**
----
 Insert Task into app.

* **URL**

  /tasks

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ``` json
    {
        "name": "<name of task>",
        "categoryId": "<Fkey from category>",
        "userId" :"<Fkey from user>"
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of task>",
        "categoryId": "<Fkey from category>",
        "userId" :"<Fkey from user>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------

**GET /tasks**
----
  Returns json data task.

* **URL**

  /tasks

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of task>",
        "categoryId": "<Fkey from category>",
        "userId" :"<Fkey from user>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------

**GET /tasks/:id**
----
  Returns json data task.

* **URL**

  /tasks/:id

* **Method:**

  `GET`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<task id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of task>",
        "categoryId": "<Fkey from category>",
        "userId" :"<Fkey from user>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------

**PUT /tasks/:id**
----
  In Need To update tasks.

* **URL**

  /tasks/:id

* **Method:**

  `PUT`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<task id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of task>",
        "categoryId": "<Fkey from category>",
        "userId" :"<Fkey from user>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------

**PATCH /tasks/:id**
----
 In Need To change categoryId 

* **URL**

  /tasks/:id

* **Method:**

  `PATCH`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<task id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of task>",
        "categoryId": "<Fkey from category>",
        "userId" :"<Fkey from user>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------

**DELETE /tasks/:id**
----
 In Need To delete tasks 

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<task id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "Task success to delete"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------


**POST /category**
----
 Insert category into app.

* **URL**

  /category

* **Method:**

  `POST`
  
* **Req Body**

  **Required:**
  ``` json
    {
        "name": "<name of category>"
        
    }
  ```
    

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
-------

**GET /category**
----
  Returns json data category.

* **URL**

  /category

* **Method:**

  `GET`
  
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------

**GET /category/:id**
----
  Returns json data category.

* **URL**

  /category/:id

* **Method:**

  `GET`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<category id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------

**PUT /category/:id**
----
  In Need To update category.

* **URL**

  /category/:id

* **Method:**

  `PUT`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<category id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "id": "<given id by system>",
        "name": "<name of category>",
        "createdAt": "<given by sytem>",
        "updatedAt": "<given by sytem>"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------


**DELETE /category/:id**
----
 In Need To delete category 

* **URL**

  /category/:id

* **Method:**

  `DELETE`

* **Req Params**

  **Required:**
  ``` json
    {
      "id": "<category id>",
    }
  ```
  
* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ``` json
    {
        "category success to delete"
    }
 
* **Error Response:**

  * **Code:** 404 RESOURCE NOT FOUND <br />
    **Content:** `{ ResourceNotFound }`
  
  OR

  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** `{ SequelizeValidationError message }`
  
  OR

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** `{ error messages }`
------
