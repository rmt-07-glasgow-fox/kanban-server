# Kanban Board 

## Available endpoints
- `POST /register`
- `POST /login`
- `POST /loginGoogle`

- `GET /task`
- `POST /task`
- `PATCH /task/:id`
- `DELETE /task/:id`

## RESTful endpoints
### POST /register

> create new user

_Request Header_
```
    not needed
```
_Request Body_
```
{
    email : "example@mal.com",
    password : "examplepassword"
}
```
_Response (201 - Created)_
```
{
    "id": 1,
    "email": "example@mail.com",
    "password": "<hashed password>",
    "updatedAt": "2021-01-15T00:38:33.042Z",
    "createdAt": "2021-01-15T00:38:33.042Z"
}
```
_Response (400 - Bad Request)_
```
{
    "message": [
        "Email has been registered",
        "Invalid email format",
        "Minimal password length is 6 character"
    ]
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /login

> login user

_Request Header_
```
    not needed
```
_Request Body_
```
{
    email : "example@mal.com",
    password : "examplepassword"
}
```
_Response (200 - OK)_
```
{
    "access_token" : "<access_token>"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Invalid Email / Password"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /loginGoogle

> login using google

_Request Header_
```
    not needed
```
_Request Body_
```
{
    "id_token" : "<id_token>"
}
```
_Response (200 - OK)_
```
{
    "access_token" : "<access_token>"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### GET /task

> Fetch task data from database

_Request Header_
```
    access_token(string)
```
_Request Body_
```
    not needed
```
_Response (200 - OK)_
```
[
    {
        "id": 1,
        "title": "example title",
        "category": "Back-Log",
        "createdAt": "2021-01-12T08:48:28.555Z",
        "updatedAt": "2021-01-14T14:34:15.442Z",
        "UserId": 1,
        "User": {
            "id": 1,
            "email": "example@mail.com"
        }
    }
]
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### POST /task

> add task

_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
    "title" : "example title"
}
```
_Response (200 - OK)_
```
{
    "id": 1,
    "title": "example",
    "category": "Back-Log",
    "UserId": 1,
    "updatedAt": "2021-01-15T00:50:09.371Z",
    "createdAt": "2021-01-15T00:50:09.371Z"
}
```
_Response (400 - Bad Request)_
```
{
    "message": [
        "Title must be filled"
    ]
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### PATCH /task/:id

> to change task category

_Request Header_
```
    access_token(string)
```
_Request Body_
```
{
    "category" : "To-Do"
}
```
_Response (200 - OK)_
```
{
    "id": 1,
    "title": "example",
    "category": "To-Do",
    "UserId": 1,
    "updatedAt": "2021-01-15T00:50:09.371Z",
    "createdAt": "2021-01-15T00:50:09.371Z"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Do not have access"
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not found"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```

### DELETE /task/:id

> Delete task 

_Request Header_
```
    access_token(string)
```
_Request Body_
```
    not needed
```
_Response (200 - OK)_
```
{
    "message": "Task have been deleted"
}
```
_Response (401 - Unauthorized)_
```
{
    "message": "Do not have access"
}
```
_Response (404 - Not Found)_
```
{
    "message": "Not found"
}
```
_Response (500 - Internal Server Error)_
```
{
    "message" : "Internal Server Error"
}
```