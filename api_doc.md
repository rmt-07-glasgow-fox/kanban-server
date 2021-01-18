# Kanban
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;

## List Endpoints TODO
- "POST/register"
- "POST/login"

- "POST/task"
- "GET/task"
- "GET/task/:category"
- "GET/task/:id"
- "PUT/task/:id"
- "Patch/task/:id"
- "DELETE/task/:id"

## RESTful endpoints

### POST /register

> Create new register

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "username": "<username to get insert into>",
  "password": "<password to get insert into>",
}
```
_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "email": "<posted on title>",
  "username": "<posted on username>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json

{
  "message": "email can not empty"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "email sudah digunakan"
}
```

_Response (400 - Bad Request)_
```json

{
  "message": "username can not empty"
}
```

_Response (400 - Bad Request)_
```json

{
  "message": "password can not empty"
}
```

_Response (400 - Bad Request)_
```json

{
  "message": "password must be min 6 characters length"
}
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```
### POST /login

> login process

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
}
```
_Response (201 - Created)_
```json
{
  "email": "<post task email>",
  "username": "<post task username>",
  "access_token": "<post access_token>",
}
```

_Response (404 - not found)_
```json

{
  "message": "email / username not found"
}
```

_Response (400 - Bad Request)_
```json

{
  "message": "email / username / password wrong"
}
```


### POST /task

> Create new task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "category": "<category to get insert into>",
  "description": "<description to get insert into>",
}
```
_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "title": "<posted title>",
  "category": "<posted on category>",
  "description": "<posted description>",
  "UserId": "<posted UserId>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title can not empty"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "category can not empty"
}
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```
---
### GET /task

> GET list all task

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

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<task title>",
    "category": "<task category>",
    "description": "<task description>",
    "UserId": "<task UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<task name>",
    "category": "<task category>",
    "description": "<task description>",
    "UserId": "<task UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  ...
]
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```

### GET /task /:id

> GET list task by id

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

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<task title>",
    "category": "<task category>",
    "description": "< task description>",
    "UserId": "<task UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```
### PUT /task /:id

> Update task list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to be update>",
  "category": "<category to be update>",
  "description": "<description to be update>",
}
```
_Response (200 - Updated)_
```json
{
  "id": <id found>,
  "title": "<updated title>",
  "category": "<updated category>",
  "description": "<updated description>",
  "UserId": "<UserId same as before>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (404 - not found)_
```json
{
  "message": "id not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title can not empty"
}
```

_Response (401 - unauthorizied)_
```json
{
  "message": "you dont have permision"
}
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```

### PATCH /task /:id

> Update a component of task list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "category": "<category to be update>",
}
```
_Response (200 - Updated)_
```json
{
  "id": <id found>,
  "title": "<title same as before>",
  "category": "<category updated>",
  "description": "<description same as before>",
  "UserId": "<UserId same as before>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
```
_Response (404 - not found)_
```json
{
  "message": "id not found"
}
```
_Response (401 - unauthorizied)_
```json
{
  "message": "you dont have permision"
}
```

_Response (500 - internal server error)_
```json
{
  "message": "Internal server error"
}
```
### DELETE /task /:id

> DELETE list task by id

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
_Response (200)_
```json

  { 
    "message": "Task success to delete"
  }

```
_Response (404 - not found)_
```json

{
  "message": "id not found"
}

```

_Response (401 - unauthorizied)_
```json
{
  "message": "you dont have permision"
}
```

_Response (500 - internal server error)_
```json

{
  "message": "Internal server error"
}

```
