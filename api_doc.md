# KABAN App Server
KABAN is an application to manage your project activity. This app has : 
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

## List available endpoints
- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

## Auth
- `POST /register`
- `POST /login`
- `POST /googleLogin`


## RESTful endpoints
### POST /tasks

> Create new tasks

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "make a bomb!",
  "category": "backlog",
}
```
#### Success

_Response (201 - Created)_
```json
{
  "id": 1,
  "title": "make a bomb!",
  "category": "backlog",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T14:23:52.990Z"
}
```
#### Error

_Response (400 - Bad Request)_
```json
{
  "errors": ["title is required", ".."]
}
```
_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### GET /tasks

> Get all tasks

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```
#### Success

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "make a bomb",
    "category": "backlog",
    "user_id": 1,
    "username": "user1",
    "email": "user1@mail.com",
    "date": "2021-01-13T15:30:46.913Z"
  }
]
```
#### Error

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### GET /tasks/:id

> Get tasks by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "title": "make a bomb!",
  "category": "backlog",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-04T14:23:52.990Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### PUT /tasks/:id

> replace tasks by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "make a bomb!",
  "category": "backlog",
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "title": "make a bomb!",
  "category": "backlog",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-05T14:23:52.990Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": ["title is required", ".."]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### PATCH /tasks/:id

> modify tasks by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": true,
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "id": 1,
  "title": "make a bomb!",
  "category": "backlog",
  "createdAt": "2021-01-04T14:23:52.990Z",
  "updatedAt": "2021-01-05T14:23:52.990Z"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "errors": ["error not found"]
}
```

_Response (400 - Bad Request)_
```json
{
  "errors": ["category is required"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---
### DELETE /tasks/:id

> remove data task by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{ "id": 1}
```
#### Success

_Response (200)_
```json
{
  "message": "task success to delete"
}
```
#### Error

_Response (404 - Error Not Found)_
```json
{
  "erros": ["error not found"]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---

### POST /register

> post newUser

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "username": "user1",
  "email": "email@mail.com",
  "password": "xxxxxxx",

}
```
#### Success

_Response (201)_
```json
{
  "id": 1,
  "username": "user1",
  "email": "email@mail.com",
}
```
#### Error

_Response (400 - Bad Request)_
```json
{
  "errors": ["email is required", ".."]
}

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---

### POST /login

> login to the page

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "email": "user1@mail.com",
  "password": "12345678",
}
```
#### Success

_Response (200)_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyMUBtYWlsLmNvbSIsImlhdCI6MTYxMDE5MDIyNH0.q7zuoMoxZ-bcNQLcZ6EaQy2lMJiMDQ5PGk63rbJrGEA",
  "username": "user1"
}
```
#### Error

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---

### POST /googleLogin

> login to the page with google

_Request Header_
```
not needed
```

_Request Body_
```json
{
  "id_token": "<google id token>",
}
```
#### Success

_Response (200)_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJ1c2VyMUBtYWlsLmNvbSIsImlhdCI6MTYxMDE5MDIyNH0.q7zuoMoxZ-bcNQLcZ6EaQy2lMJiMDQ5PGk63rbJrGEA",
  "username": "user1"
}
```
#### Error

_Response (500 - Internal Server Error)_
```json
{
  "errors": ["internal server error"]
}
```
---