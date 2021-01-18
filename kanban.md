# Kanban Server
Kanban App is an app for scheduling and controlling your organization activities.

&nbsp;

## RESTful endpoints
POST /register
POST /login
POST /tasks
GET /tasks
GET /tasks/:id
PUT /tasks/:id
PATCH /tasks/:id
DELETE /tasks/:id
POST /organizations
GET /organizations
PATCH /organizations/:id



### POST /register

> Create new account

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": string,
  "password": string
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  errors
}
```

### POST /login

> Sign In User

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": string,
  "password": string
}
```

_Response (200 - OK)_
```
{
  accessToken
}
```

_Response (400 - Bad Request)_
```
{
  errors
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### POST /tasks

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": string
}
```

_Request User_
```
{
  "UserId": integer,
  "email": string,
  "OrganizationId" : integer
}
```

_Response (201 - Created)_
```
{
  "name": "<posted name>",
  "status": "<posted status>"
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /tasks

> Get all tasks

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
[
    {
        "name": "<posted name>",
        "status": "<posted status>",
        "email": "<posted email>",
        "organization": "<posted organization>",
        "updatedAt": "<new Date()>"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /tasks/:id

> Get task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
      "name": "<posted name>",
      "status": "<posted status>",
      "email": "<posted email>",
      "organization": "<posted organization>",
      "updatedAt": "<new Date()>"
  }
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### PUT /tasks/:id

> Update task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Params_
```
{ id: <posted id>}
```

_Request Body_
```
{
  "name": string
}
```

_Response (200 - OK)_
```
  {
    "message": "edit successfull"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```


### PATCH /tasks/:id

> Update task status by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
{
  "status": "<status to get insert into>"
}
```

_Response (200 - OK)_
```
  {
    "message": "update status successfull"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation Error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### DELETE /tasks/:id

> Delete task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request Body_
```
not needed
```

_Response (200 - OK)_
```
  {
    message : "Task success to delete"
  }
```
_Response (404 - Not Found)_
```
{
  "message": "not found"
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### POST /organizations

> Create new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "name": string
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "name": "<posted name>"
}
```

_Response (400 - Bad Request)_
```
{
  Validation error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### GET /organizations/:id

> Get all organizations

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Body_
```
not needed
```


_Response (200 - OK)_
```
  {
    "id": <given id by system>,
    "name": "<posted name>"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation Error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


### PATCH /organizations/:id

> Update user organization by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```
_Request Params_
```
{ id: integer}
```

_Request User_
```
{
  "UserId": "<UserId to get insert into>"
}
```

_Response (200 - OK)_
```
  {
    "id": <given id by system>,
    "email": "<posted email>"
  }
```
_Response (400 - Bad Request)_
```
{
  Validation Error
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---


