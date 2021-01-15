# Cookpad app Documentation

kanban-yuk app is an application to save our activities and job progress . This app has :
* Authentication and Authorization Server
* Register and Login with Google Account
* Single page application
* CRUD Task
* Vue based client
* JSON formatted response

## List available endpoints
- `POST /tasks/register` => register
- `POST /tasks/login` => login 
- `POST /tasks/googleLogin` => google login
- `GET /tasks` => read all task
- `POST /tasks` => create task
- `GET /tasks/:id` => get one task
- `PUT /tasks/:id` => edit task
- `PATCH /tasks/:id` => edit category of task
- `DELETE /tasks/:id` => delete task
- `GET /tasks/categories` => read all categories

## RESTful endpoints
### POST /tasks/register

> register/add user

_Request Header_
```json

none
```

_Request Body_
```json

{
      "email": "tes1@mail.com",
      "password": "qweqwe"
}
```

_Response (200)_
```json

{
      "id": 1,
      "email": "tes1@mail.com",
      "password": "qweqwe",
      "createdAt": "2021-01-15T07:51:26.896Z",
      "updatedAt": "2021-01-15T11:09:30.632Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid email/password format"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /tasks/googleLogin

> logi user via google

_Request Header_
```json

none
```

_Request Body_
```json

{
      "id_token": "<id_token>",
}
```

_Response (200)_
```json

{
      "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /tasks/login

> login user

_Request Header_
```json

none
```

_Request Body_
```json

{
      "email": "tes1@mail.com",
      "password": "qweqwe"
}
```

_Response (200)_
```json

{
      "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```json

{
  "message": "Invalid email/password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
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
```json

not needed
```

_Response (200)_
```json

    {
        "id": 2,
        "title": "melawan belanda",
        "CategoryId": 4,
        "UserId": 1,
        "createdAt": "2021-01-15T07:41:37.124Z",
        "updatedAt": "2021-01-15T07:51:11.015Z",
    },
    {
        "id": 3,
        "title": "mencari referensi",
        "CategoryId": 3,
        "UserId": 1,
        "createdAt": "2021-01-15T07:51:26.896Z",
        "updatedAt": "2021-01-15T11:09:30.632Z",
    }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Invalid request"
}
```
---
### POST /tasks

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
    "title": "fitur login",
    "CategoryId": 4,
  }
```

_Response (201 - Created)_
```json

{
      "id": 3,
      "title": "mencari referensi",
      "CategoryId": 3,
      "UserId": 1,
      "createdAt": "2021-01-15T07:51:26.896Z",
      "updatedAt": "2021-01-15T11:09:30.632Z",
    
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "title must be filled"
}
```
### GET /tasks/:id

> Read one task by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

not needed
```

_Request Params_
```json

3
```

_Response (200)_
```json

{
      "id": 3,
      "title": "mencari referensi",
      "CategoryId": 3,
      "UserId": 1,
      "createdAt": "2021-01-15T07:51:26.896Z",
      "updatedAt": "2021-01-15T11:09:30.632Z",
    
}
```

_Response (404 - Not Found)_
```json
{
  "message": "not found"
}
```
### PUT /tasks/:id

> edit task by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
      "title": "mencari referensi dokumentasi",
      "CategoryId": 3,
      "UserId": 1
    
}
```

_Request Params_
```json

"id": 3
```

_Response (200)_
```json
{
    
      "id": 3,
      "title": "mencari referensi dokumentasi",
      "CategoryId": 3,
      "UserId": 1,
      "createdAt": "2021-01-15T07:51:26.896Z",
      "updatedAt": "2021-01-15T11:09:30.632Z",
    
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### PATCH /tasks/:id

> Edit Category of task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

{
    CategoryId: 4,
}
```

_Request Params_
```json

"id": 3
```

_Response (200)_
```json
{
    
      "id": 3,
      "title": "mencari referensi dokumentasi",
      "CategoryId": 4,
      "UserId": 1,
      "createdAt": "2021-01-15T07:51:26.896Z",
      "updatedAt": "2021-01-15T11:09:30.632Z",
    
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

### DELETE /tasks/:id

> Delete task by id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json

not needed
```

_Request Params_
```json

"id": 3
```

_Response (200)_
```json
{
  "message": "task success to delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Invalid requests"
}
```