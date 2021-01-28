**Kanban**
----
    Membuat website untuk mencatat hal - hal menarik untuk dilakukan

* **URL**
    http://localhost:3000


* **List Endpoint**
  
  &nbsp;

## POST /tasks
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "category": "<category to get insert into>",
  "userId": "<automatically inserted by user id>"
}
```
_Response (201 - OK)_
```
{
  "id": "<give id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "category": "<posted category>",
  "userId": "<automatically inserted by user id>",
  "createdAt: "<automatically inserted system>",
  "updatedAt: "<automatically inserted system>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## GET /tasks
_Request Header_
```
{
  "access_token": "<access_token>"
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
  "id": "<give id by system>",
  "title": "<posted title>",
  "description": "<posted description>",
  "category": "<posted category>",
  "userId": "<automatically inserted by user id>",
  "createdAt: "<automatically inserted system>",
  "updatedAt: "<automatically inserted system>"
  }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## PUT /tasks/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Request Body_
```
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
  "category": "<category to get insert into>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"title": "<posted title>",
"description": "<posted description>",
"category": "<posted category>",
"userId": "<automatically inserted by user id>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## PATCH /tasks/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Request Body_
```
{
  "category": "<category to get insert into>"
}
```
_Response (200 - OK)_
```
{
"id": "<give id by system>",
"title": "<posted title>",
"description": "<posted description>",
"category": "<posted category>",
"userId": "<automatically inserted by user id>",
"createdAt: "<automatically inserted system>",
"updatedAt: "<automatically inserted system>"
}
```
_Response (401 - accessDenied)_
```
{
  "message": "no access for this action"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## DELETE /tasks/:id
_Request Header_
```
{
  "access_token": "<access_token>"
}
```
_Request Params_
```
{
  "id": "<depend on user login id>"
}
```
_Response (200 - OK)_
```
{
  "message": "task success to delete"
}
```
&nbsp;
## POST /register
_Request Header_
```
{
  not needed
}
```
_Request Body_
```
{
  "email": "<email to get insert into>",
  "fullName": "<full name to get insert into>"
  "password": "<password to get insert into>"
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
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## POST /login
_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```
_Response (200 - OK)_
```
{
  "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```
&nbsp;
## POST /googleLogin
_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```
_Response (200 - OK)_
```
{
  "access_token": "<access_token>"
}
```
_Response (400 - Bad Request)_
```
{
  Error message from SequelizeValdationError
}
```
_Response (500 - Internal Server Error)_
```
{
  "message": "error from the server"
}
```