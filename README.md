# kanban-server

```
Create Kanban app, using express, Vue, axios
* RESTful endpoint for Kanban List's CRUD operation
* JSON formatted response
* Web Server response
```

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
Run `live-server --host=localhost` to start the client
```

## Restful endpoints
<!-- --- -->
# URL

Client URL : http://localhost:1234
Server URL : http://localhost:3000

### GET/tasks

>get all Task list

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```

_Response (200)_
```
 {
    "id": 16,
    "title": "Belajar 2",
    "CategoryId": 2,
    "createdAt": "2020-11-27T14:24:59.702Z",
    "updatedAt": "2020-11-27T16:31:57.412Z",
    "UserId": 4
  }
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```



### POST/tasks

>Create new tasks list

__Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
}
```
_Response (201 - Created)_
```
{
  "title": 21,
  "categoryId": 1,
  "UserId": 4,
  "updatedAt": "2020-11-27T19:01:13.152Z",
  "createdAt": "2020-11-27T19:01:13.152Z"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```
### GET/tasks/2

>get task by id
_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
not needed
```
_Response (200)_
```
{
  "title": 21,
  "categoryId": 1,
  "UserId": 4,
  "updatedAt": "2020-11-27T19:01:13.152Z",
  "createdAt": "2020-11-27T19:01:13.152Z"
}

 
 
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Internal Server Error"
}
```

_Response(404 - not found)_
```
{
  "message": "Id not found"
}
```


### PUT/task/:id

>Update task list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "title": "<title to get updated later on>",
  "CategoryId": "<categoryId automatis fill in client >",
  "UserId": "<categoryId automatis fill in client>,
}
```
_Response(200)_
```
{
  "title": 21,
  "categoryId": 1,
  "UserId": 4,
  "updatedAt": "2020-11-27T19:01:13.152Z",
  "createdAt": "2020-11-27T19:01:13.152Z"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not autorized to access this task"
}
```

_Response(404 - not found)_
```
{
  "message": "Id not found"
}
```




_Response (500)_
```

{
  "message": "Internal Server Error"
}
```
### PATCH/tasks/:id

>Modify Categories tasks list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
   "CategoryId": "<status to get updated later on>"
}
```
_Response(200)_
```
{
  "title": 21,
  "categoryId": 1,
  "UserId": 4,
  "updatedAt": "2020-11-27T19:01:13.152Z",
  "createdAt": "2020-11-27T19:01:13.152Z"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not autorized to access this task"
}
```

_Response(404 - not found)_
```
{
  "message": "Id not found"
}
```


_Response (500)_
```

{
  "message": "Internal Server Error"
}
```

### DELETE/task/:id

>Delete task list by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "delete success"
}
```

_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response(403- Forbidden)_
```
{
  "message": "you are not autorized to access this task"
}
```

_Response(404 - not found)_
```
{
  "message": "Id not found"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/register

>Create User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201)_
```
{
  "id": 25,
  "email": "ogyrahmawan@ymail.com",
  "password": "$2a$08$h.kbgDtxJwE/koklvTOWNOZEU6/csi46/RbbIjwfQB6B3cyY/NS.W",
  "updatedAt": "2020-11-27T18:53:16.688Z",
  "createdAt": "2020-11-27T18:53:16.688Z"
}
```
_Response(400- bad request)_
```
{
   "message": "Validation error: min password length is 6, email must be unique, Validation error: Validation isEmail on email failed,\nValidation error: Validation notEmpty on email failed, Validation error: min password length is 4,\nValidation error: Validation isEmail on email failed,\nValidation error: Validation notEmpty on password failed,email must be unique"
}
```


_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/login

>Login User

_Request Header_
```
not needed
```

_Request Body_
```
{
   
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```
{
    "access_token": <token>
}
```
_Response(400- bad request)_
```
{
    "message": "invalid email or password"
}
```


_Response (500)_
```
{
  "message": "Internal Server Error"
}
```

### POST/google-sign-in

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{
    "id_token": <id_token>;
}
```

_Response(200)_
```
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiZW1haWwiOiJvZ3lyYWhtYXdhbkBnbWFpbC5jb20iLCJpYXQiOjE2MDY1MjM5ODJ9.67RLPaYnmqyfiEvEnITuq3QsLjX8AEBbpiHUJxaPkrQ"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
### GET/Categories

>Get All Categories Task

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
not need
```

_Response(200)_
```
{
  "id": 1,
  "name": "Backlog",
  "updatedAt": "2020-11-27T19:01:13.152Z",
  "createdAt": "2020-11-27T19:01:13.152Z"
}
```
_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```
### POST/categories

>Post Categories

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
{
    "Category": "done"
}

```

_Response(201)_
```
{
  "id": 1,
  "name": "Backlog",
  "updatedAt": "2020-11-27T19:01:13.152Z",
  "createdAt": "2020-11-27T19:01:13.152Z"
}
```
_Response(401- Unauthorized)_
```
{
  "message": "Please login first"
}
```

_Response (500)_
```
{
  "message": "Internal Server Error"
}
```