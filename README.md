# Kanban App Server
Kanban App is an application to make Task list. This app has:
* RESTful endpoint for asset's CRUD operation
* Using Vue as client
* Using Express JS as server
* Using Postgress and sequelize as Database

&nbsp;

## USAGE
- Make sure you have Node.js and npm in your computer and then run `npm install`.
- In order to get access to all of the routes, you will need a `JWT(JSON Web Token) Token` which will be generated automatically after you sign in successfully.
- For start the server: `npm run dev`.

&nbsp;


## RESTful endpoints
### GET /tasks

> Get all Tasks list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
[
{
        "id": 12,
        "title": "Test title",
        "UserId": 2,
        "CategoryId": 1,
        "createdAt": "2021-01-12T16:38:26.232Z",
        "updatedAt": "2021-01-12T16:38:26.232Z"
    },
    {
        "id": 13,
        "title": "Test title",
        "UserId": 2,
        "CategoryId": 2,
        "createdAt": "2021-01-13T23:11:57.558Z",
        "updatedAt": "2021-01-13T23:11:57.558Z"
    },
    {
        "id": 14,
        "title": "Test title",
        "UserId": 2,
        "CategoryId": 3,
        "createdAt": "2021-01-13T23:12:05.842Z",
        "updatedAt": "2021-01-13T23:12:05.842Z"
    }
]
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### POST /tasks

> Create new Task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<title to get insert into>",
  "CategoryId": "<Category to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": 25,
    "title": "AB-Test title",
    "UserId": 2,
    "CategoryId": 4,
    "updatedAt": "2021-01-15T16:08:05.201Z",
    "createdAt": "2021-01-15T16:08:05.201Z"
}
```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

---

### GET /tasks/:id

> get Tasks list by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```
{
    "id": 13,
    "title": "Test title",
    "UserId": 2,
    "CategoryId": 2,
    "createdAt": "2021-01-13T23:11:57.558Z",
    "updatedAt": "2021-01-13T23:11:57.558Z"
}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### PUT /tasks/:id

> Update Task list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{

  "title": "<title to get updated later on>",
  "CategoryId": "<Category to get updated later on>"
}
```


_Response(200)_
```
{

}
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response(400- bad request)_
```
{
    "Error": "Validation error",
    "message": "Title cannot empty,Cannot input an older date than now"
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
---

### DELETE /tasks/:id

>Delete Task list by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```


_Request Body_
selected Task data by User

_Response(200)_
```

```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "Invalid email / password"
}
```

_Response(403- Forbidden)_
```
{
    "Error": "Forbidden access",
    "message": "You are not authorized to access the file"
}
```

_Response(404 - not found)_
```
{
    "Error": "Invalid Id",
    "message": "Data not found"
}

```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### GET /categories

> Get all Category with Tasks list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
none
```

_Response (200)_
```json
[
[
    {
        "id": 1,
        "name": "backlog",
        "createdAt": "2021-01-12T13:17:11.954Z",
        "updatedAt": "2021-01-12T13:17:11.954Z",
        "Tasks": [
            {
                "id": 4,
                "title": "Test1",
                "UserId": null,
                "CategoryId": 1,
                "createdAt": "2021-01-12T13:19:28.202Z",
                "updatedAt": "2021-01-12T13:19:28.202Z"
            },
          ...
        ]
    },
    {
        "id": 2,
        "name": "todo",
        "createdAt": "2021-01-12T13:17:11.954Z",
        "updatedAt": "2021-01-12T13:17:11.954Z",
        "Tasks": [
            {
             ....
]
```

_Response(401- Unauthorized)_
```
{
    "Error": "Invalid Authentication",
    "message": "The requested page needs a username and a password."
}
```

_Response (500 - Internal Server Error)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```



---

### POST /register

>Create User

_Request Header_
```
none
```

_Request Body_
```
{
    "name": "<User's name>",
    "email": "<User's email>",
    "password": "<User's password>"
    
}
```

_Response(201)_
```
{
    "id": 22,
    "email": "admin31@mail.com"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```


_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```

### POST/login

> Login User

_Request Header_
```
none
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
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbjJAbWFpbC5jb20iLCJpYXQiOjE2MTA3MjY4MDV9.FZIlb4E0MygIiUHgF4qBqY8y6e5zfzMvHE9BzDmgdBU"
}
```


_Response(400- bad request)_
```
{
    "Error": "Bad request",
    "message": "Invalid email / password"
}
```


_Response (500)_
```
{
    "Error": "Error from Server",
    "message": "Internal server error"
}
```
```
