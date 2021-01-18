# Kanban App Server
My Assets App is an application to manage your assets. This app has : 
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

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
  "title": "<title to get insert into>",
  "category": "<category to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "title": "<posted title>",
  "category": "<posted category>",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
  "UserId": "<posted UserId>",
}
```


_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Validation error: Validation notEmpty on title failed"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
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

_Response (200)_
```
[
  {
    "id": 1,
    "title": "<task name>",
    "category": "<task category>",
    "UserId": "<UserId>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  },
  {
    "id": 2,
    "title": "<task name>",
    "category": "<task category>",
    "UserId": "<UserId>",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### GET /tasks/:id

> Get tasks by ID

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

_Response (200)_
```
  {
    "id": 1,
    "title": "<task name>",
    "category": "<task category>",
    "UserId": "<UserId>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Task Not Found"
}
```

---
### PUT /tasks/:id

> PUT tasks by ID

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
  "category": "<category to get insert into>"
}
```

_Response (200)_
```
  {
    "id": 1,
    "title": "<task name>",
    "category": "<task category>",
    "UserId": "<UserId>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (400 - Bad Request)_
```
{
    "message": "Validation error: Validation notEmpty on title failed"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Task Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### PATCH /tasks/:id

> PATCH tasks by ID

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "category": "<category to get insert into>"
}
```

_Response (200)_
```
  {
    "id": 1,
    "title": "<task name>",
    "category": "<task category>",
    "UserId": "<UserId>"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (400 - Bad Request)_
```
{
    "err": "Validation error: Validation notEmpty on category failed"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Task Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### DELETE /tasks/:id

> DELETE tasks by ID

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

_Response (200)_
```
{
    "message": "Task has been deleted"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Unauthorized"
}
```

_Response (401 - Unauthorized)_
```
{
    "message": "Please login first"
}
```

_Response (404 - Not Found)_
```
{
    "message": "Task Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### POST /register

> CREATE new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
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
    "message": "Validation error: Invalid email format"
}

```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```

---
### POST /login

> LOGIN user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>"
}
```

_Response (200)_
```
  {
    "access_token": <generate token>
  }
```

_Response (400 - Bad Request)_
```
{
    "message": "Invalid email / password"
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": "Internal Server Error"
}
```


