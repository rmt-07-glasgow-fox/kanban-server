# Kanban App
Kanban App is an application that help you to manage todo, project, task, etc. This app has : 
* User Friendly
* Easy to Use
* RESTful endpoint for todo's CRUD operation
* JSON formatted response

&nbsp;

## List of available endpoints
- `POST /register`
- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`
- `GET /categories`
- `POST /categories`
- `DELETE /categories/:id`

## RESTful endpoints
### POST /register

> Create new user

_Request Header_
```
{
not needed
}
```

_Request Body_
```json
{
  "fullname": "<fullname to get insert into>",
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (201)_
```json
{
  "id": <given id by system>,
  "fullname": "<posted fullname>",
  "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### POST /login

> Compare data login on database with data inputed

_Request Header_
```
{
not needed
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

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
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

_Response (200)_
```json
[
  {
    "id": 1,
    "title": "<task name>",
    "CategoryId": "<category id>",
    "UserId": "<user id>"
  },
  {
    "id": 2,
    "title": "<task name>",
    "CategoryId": "<category id>",
    "UserId": "<user id>"
  }
]
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
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
  "title": "<title to get insert into>",
  "category": "<category id to get insert into>",
  "description" : "<description to get insert into>",
  "CategoryId" : "<CaregoryId to get insert into>"
}
```

_Response (201 - Created)_
```json
{
  "msg" : "data successfull create",
  "id": <given id by system>,
  "title": "<posted title>",
  "CategoryId": "<posted CategoryId>",
  "UserId" : "<posted UserId>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### GET /tasks/:id

> Get task with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id task want to get>"
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
    "UserId": "<user id>"
  },
  {
    "id": 2,
    "title": "<task name>",
    "CategoryId": "<category id>",
    "UserId": "<user id>"
  }
]
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error Not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
### PUT /tasks/:id

> Update task with the id inputed


_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id task want to be updated>"
}
```

_Request Body_
```json
{
  "title": "<title to get updated>",
  "category" : "<category to get updated>",
  "CategoryId": "<posted to get updated>"
}
```

_Response (201)_
```json
{
  "message": "susscesfull moving task to todos"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---

### DELETE /tasks/:id

> Delete task with the id inputed

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Params_
```json
{
    "id": "<id task want to be deleted>"
}
```

_Request Body_
```
{
not needed
}
```

_Response (200)_
```json
{
  "message": "Task 1 success to delete"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "<err>"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Error Not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Error in internal server"
}
```
---
