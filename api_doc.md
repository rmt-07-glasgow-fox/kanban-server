# Kanban App
Kanban App is an application that help you to manage todo, project, task, etc. This app has : 
* User Friendly
* Easy to Use
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## List of available endpoints
- `GET /register`
- `POST /register`
- `DELETE /register/:id`
- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`
- `GET /categories`
- `POST /categories`
- `DELETE /categories/:id`

## RESTful endpoints
### GET /tasks

> Get all task

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
    "title": "<task name>",
    "CategoryId": "<category id>",
    "UserId": "<user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<task name>",
    "CategoryId": "<category id>",
    "UserId": "<user id>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
---
### POST /todos

> Create new todo

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
  "Category": "<category id to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "id": <given id by system>,
  "title": "<posted title>",
  "CategoryId": "<posted CategoryId>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
---
### PUT /todos/:id

> Update todo with the id inputed


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": "<id todo want to be deleted>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  // "createdAt": "2020-03-20T07:15:12.149Z",
  // "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
---
### PATCH /todos/:id

> Update todo with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": "<id todo want to be deleted>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "name": "<posted name>",
  "description": "<posted description>",
  "status": "<posted status>",
  "due_date": "<posted due_date>",
  // "createdAt": "2020-03-20T07:15:12.149Z",
  // "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo not found"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid requests"
}
```
---
### DELETE /todos/:id

> Delete todo with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "id": "<id todo want to be deleted>"
}
```

_Response (200)_
```json
{
  "message": "Todo has been deleted"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Todo not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal server error"
}
```
---
### POST /register

> Create new user

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "email": "<posted email>",
  // "createdAt": "2020-03-20T07:15:12.149Z",
  // "updatedAt": "2020-03-20T07:15:12.149Z",
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```
---
### POST /login

> Compare data login database with request

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "email": "<email to get compare>",
  "password": "<password to get compare>"
}
```

_Response (200)_
```json
{
  "acces_token": "<your acces token>"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Invalid email/ password"
}
```
