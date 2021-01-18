# kanban-server

```
Create fancy to do app, using express, jquery, ajax, axios
* RESTful endpoint for Kanban's CRUD operation
* JSON formatted response
* Web Server response
* Getting a Charity List if you want to add a Fund Raising task in this app via Charity 3rd API
```

# USAGE
```
Make sure you have Node.js and npm in your computer and then run `npm install`.
In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
Run `nodemon app.js  to start the server.
```

##Restful endpoints
# URL
```
Client URL : http://localhost:1234
Server URL : http://localhost:4000
```

### GET/tasks

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
```javascript


{
    "Tasks": [
       
        {
            "id": 8,
            "name": "makan",
            "description": "mandi",
            "CategoryId": 1,
            "UserId": 1
        },
        {
            "id": 3,
            "name": "masak",
            "description": "tidur",
            "CategoryId": 1,
            "UserId": 1
        },
        {
            "id": 2,
            "name": "idup",
            "description": "sans",  
            "CategoryId": 1,
            "UserId": 1        
        }
    ]
}
```

_Response (500 - Bad Request)_
```javascript
{
  "Error": UNKNOWN_ERROR,
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
```javascript
{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
```
_Response (201 - Created)_
```javascript
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "CategoryId": "<given id by system>",
  "UserId": <given by system>
  
}
```
_Response(400- bad request)_
```javascript
{
    "Error" :  VALIDATION_ERROR
    "message": "Name required, Description required", "This email is already taken try another"
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "invalid"
    "message": "Invalid Email/Password"
}
```



_Response (500)_
```javascript
{
   "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```
### GET/tasks/:id

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
```javascript
{
    "task": {
        "id": 6,
        "title": "nyapu",
        "description": "nyapu kamar",
        "CategoryId": 1,
        "UserId": 1
    }
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "invalid"
    "message": "Invalid Email/Password"
}
```

_Response(403- Forbidden)_
```javascript
{
    "Error" :  "NotAuthorized"
    "message": "No Authorization"
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "invalid",
  "message": "Data not found"
}
```

_Response (500)_
```javascript
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```
### POST/tasks/:id

>Update tasks list by ID

_Request Header_
```
{
  access_token: token
}
```


_Request Body_
```javascript
{
  "name": "<name to get updated later on>",
  "description": "<description to get updated later on>",
}
```
_Response(200)_
```javascript
{
    "id": 18,
    "name": "Farhad",
    "description": "afk",
    "CategoryId": 1
    "UserId": 1,
    "createdAt": "2021-01-09T08:55:40.180Z",
    "updatedAt": "2021-01-09T08:56:28.895Z"
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "invalid"
    "message": "Invalid Email/Password"
}
```

_Response(403- Forbidden)_
```javascript
{
    "Error" :  "NotAuthorized"
    "message": "No Authorization"
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "invalid",
  "message": "Error Data Not Found"
}
```



_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required, Description required"
}
```
_Response (500)_
```javascript

{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}
```


### DELETE/tasks/:id

>Delete tasks list by ID

_Request Header_
```
{
  access_token: token
}
```

_Response(200)_
```javascript
{
    "message": "Deleted Task Success"
}
```

_Response(401- Unauthorized)_
```javascript
{
    "Error" :  "invalid"
    "message": "Invalid Email/Password"
}
```

_Response(403- Forbidden)_
```javascript
{
    "Error" :  "NotAuthorized"
    "message": "No Authorization"
}
```

_Response(404 - not found)_
```javascript
{
  "Error": "Invalid",
  "message": "Data Not Found"
}
```
_Response (500)_
```javascript
{
  "Error": UNKNOWN_ERROR,
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
```javascript
{
    "name": "<User's Name>",
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(201)_
```javascript
{
    "name": "farhad",
    "email": "farhad@gmail.com",
    "password": "kvndlkfrnfoieneknne"
}
```
_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Name required, Email required, Password required"
}
```


_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
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
```javascript
{
   
    "email": "<User's email>",
    "password": "<User's password>"
}
```

_Response(200)_
```javascript
{
    "access_token": alkdfknoeifheoifnien4y08
}
```
_Response(400- bad request)_
```javascript
{
    "Error" :  "VALIDATION_ERROR"
    "message": "Email required,Password required, Invalid email format"
}
```


_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

### POST/loginGoogle

Request Header

```Not Needed```

Request Body

```javascript
{
    "id_token": "<your id_token>"
}
```

_Response(200)
```javascript
{
    "access_token": "<your access_token>"
}
```
OR

_Response(201)
```javascript
{
    "access_token": "<your access_token>"
}
```

_Response(401)
```javascript
{
    "message":  "<Invalid Email/Password>" ,
    
}
```

_Response (500)_
```javascript
{
  "Error": "UNKNOWN_ERROR",
  "message": "Internal Server Error"
}
```

### GET/categories

>get all category list

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
```javascript


[
    {
        "id": 1,
        "name": "Back-log",
        "createdAt": "2021-01-12T13:49:14.344Z",
        "updatedAt": "2021-01-12T13:49:14.344Z",
        "Tasks": [
            {
                "id": 18,
                "name": "Makan",
                "description": "Tidur\n",
                "UserId": 2,
                "CategoryId": 1,
                "createdAt": "2021-01-15T08:54:12.981Z",
                "updatedAt": "2021-01-15T11:37:56.077Z"
            },
            {
                "id": 19,
                "name": "Makan",
                "description": "Tidur\n",
                "UserId": 2,
                "CategoryId": 1,
                "createdAt": "2021-01-15T08:54:13.282Z",
                "updatedAt": "2021-01-15T11:37:54.936Z"
            },
            {
                "id": 20,
                "name": "fasasd",
                "description": "asdasdadsadasd",
                "UserId": 2,
                "CategoryId": 1,
                "createdAt": "2021-01-15T11:21:02.041Z",
                "updatedAt": "2021-01-15T11:37:53.360Z"
            },
            {
                "id": 22,
                "name": "asdasd",
                "description": "asdasdas",
                "UserId": 2,
                "CategoryId": 1,
                "createdAt": "2021-01-15T11:30:44.881Z",
                "updatedAt": "2021-01-15T11:30:44.881Z"
            }
        ]
    },
    {
        "id": 2,
        "name": "To-Do",
        "createdAt": "2021-01-12T13:49:14.344Z",
        "updatedAt": "2021-01-12T13:49:14.344Z",
        "Tasks": []
    },
    {
        "id": 3,
        "name": "Doing",
        "createdAt": "2021-01-12T13:49:14.344Z",
        "updatedAt": "2021-01-12T13:49:14.344Z",
        "Tasks": []
    },
    {
        "id": 4,
        "name": "Done",
        "createdAt": "2021-01-12T13:49:14.344Z",
        "updatedAt": "2021-01-12T13:49:14.344Z",
        "Tasks": []
    }
]
```

_Response (500 - Bad Request)_
```javascript
{
  "Error": UNKNOWN_ERROR,
  "message": "Internal Server Error"
}