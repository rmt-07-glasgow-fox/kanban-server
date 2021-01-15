# Kanban
```
Create your kanban with your teams using this kanban app, using express, sequelize, vue js, and axios
* REST API endpoint for Task's CRUD operation
* REST API endpoint for Category's CRUD operation
* JSON formatted response
```

# USAGE
```
Open your text editor with Node.js in your computer and then run `npm install`
Run `npx nodemon app.js  to start the server
Run `live-server --host=localhost` to start the client
```

## Restful endpoints
<!-- --- -->
# URL
```
Client URL : http://localhost:8080
Server URL : http://localhost:3000
```

## ENDPOINT LIST
- POST /tasks
- GET /tasks
- GET /tasks/:id
- PUT /tasks/:id
- PATCH /tasks/:id
- DELETE /tasks/:id
- POST /categories
- GET /categories
- DELETE /categories/:id
- POST /google/googleLogin
- POST /register
- POST /login


## POST/tasks

>Create new task

_Request Header_
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
  "id": <given id by system>,
  "title": "<posted title>",
  "userId": "<automatically filled>",
  "categoryId": "<automatically filled>",
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Title cannot be empty"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## GET/tasks

>get all tasks list


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
  "Tasks": [
    {
      "id": 1,
      "title": "Server",
    },
    {
      "id": 2,
      "title": "Google OAuth",
    },
    {
      "id": 3,
      "title": "Debugging",
    }
  ]
}
```


_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```



## GET/tasks/:id

>Get tasks list by ID


__Request Header_
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
  "task": {
    "id": 4,
    "title": "Creating Template",
  }
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```
_Response(404 - Not Found)_
```
{
  "Error": "NotFound",
  "message": "Not Found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## PUT/tasks/:id

>Update task by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```
{
  "title": "<new title to update>",
}
```
_Response(200)_
```
{
  "id": <given id by system>,
  "title": "<updated title>",
  "userId": "<automatically filled>",
  "categoryId": "<automatically filled>",
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Title cannot be empty"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```
_Response(404 - Not Found)_
```
{
  "Error": "NotFound",
  "message": "Not Found"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## PATCH/tasks/:id

>Update tasks category by ID

_Request Header_
```
{
  access_token: token
}
```

_Request Body_
```
{
  "categoryId": "<new categoryId to update>"
}
```
_Response(200)_
```
{
  "id": <given id by system>,
  "title": "<automatically filled>",
  "userId": "<automatically filled>",
  "categoryId": "<automatically filled>",
}
```

_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## DELETE/tasks/:id

>Delete task by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "Task successfuly deleted"
}
```

_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Unauthorized)_
```
{
  "Error" :  "Unauthorized"
  "message": "You're not authorized!!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```



## POST/categories

>Create new category

_Request Header_
```
{
  access_token: token
}
```
_Request Body_
```
{
  "name": "<name to get insert into>",
}
```
_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>",
}
```
_Response(400- bad request)_
```
{
  "Error" :  "VALIDATION_ERROR"
  "message": "Name cannot be empty"
}
```
_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```


## GET/categories

>get all categories list


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
  "categories": [
    {
      "id": 1,
      "title": "Backlog",
    },
    {
      "id": 2,
      "title": "Doing",
    },
    {
      "id": 3,
      "title": "Done",
    }
  ]
}
```


_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```



## DELETE/categories/:id

>Delete category by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```
{
  "message": "Category successfuly deleted"
}
```

_Response(401- Not Logged In)_
```
{
  "Error" :  "NotLoggedIn"
  "message": "Please login first!"
}
```
_Response(403- Cannot Delete)_
```
{
  "Error" :  "CannotDelete"
  "message": "You cannot delete this!"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```




## POST/google/googleLogin

>Google Sign IN User

_Request Header_
```
not needed
```

_Request Body_
```
{
  "id_token": "id_token";
}
```

_Response(200)_
```
Google's Payload
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/register

>Create new user account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "fullname": "<User's fullname>",
  "email": "<User's email>",
  "password": "<User's password>"
}
```

_Response(201)_
```
{
    "id": "1",
    "fullname": "someone"
    "email": "someone@mail.com",
    "password": <encrypted password>
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Fullname cannot be empty, Email cannot be empty, Invalid email format, Password must contain at least 6 characters"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```

## POST/login

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
  access_token: token 
}
```
_Response(400- bad request)_
```
{
    "Error" :  "VALIDATION_ERROR"
    "message": "invalid email or password"
}
```

_Response (500)_
```
{
  "Error": "INTERNAL_SERVER_ERROR",
  "message": "internal server error"
}
```
