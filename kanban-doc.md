# Kanban App Server
Kanban App is an application to manage your tasks. This app has : 
* RESTful endpoint for users and tasks CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

* /
* /register
* /login


### GET /

> Get home page

_Request Header_
```
not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message": "Welcome to Kanban"
}
```

---

### POST /register

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "username" : "< username >"
  "password" : "< user password >"
  "email" : "< user email >"
  "firstName" : "< user first name >"
  "lastName" : "< user last name >"
}
```

_Response (201 - Created)_
```
{
    "id": "< id given by database >",
    "username": "< inserted username >",
    "email": "< inserted email ",
    "firstName": "< inserted user first name >",
    "lastName": "< inserted user last name >",
    "OrganizationId": null
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "< error message >"
    ]
}
```

---

### POST /login

> Create new user

_Request Header_
```
not needed
```

_Request Body_
```
{
  "input" : "< username / email >"
  "password" : "< user password >"
}
```

_Response (200 - Ok)_
```
{
    "access_token": "< jwt access token >"
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "< error message >"
    ]
}
```

---

### PATCH /selectOrg

> Create new user

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
{
  "OrganizationId" : "< organization id >"
}
```

_Response (200 - Ok)_
```
{
    "updated": {
        "id": < user id >,
        "username": "< username >",
        "email": "< user email >",
        "firstName": "< user first name >",
        "lastName": "< user last name >",
        "OrganizationId": < user organization id >
    }
}
```

_Response (500 - Internal Server Error)_
```
{
    "err": [
        "< error message >"
    ]
}
```

---

### POST /organizations

> Create new organization

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
{
  "name" : "< organization name >"
}
```

_Response (201 - Created)_
```
{
    "id": < new organization id >,
    "name": "< new organization name >"
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "< error message >"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "err": [
        "< error message >"
    ]
}
```

---

### GET /organizations

> Get organizations list

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
not needed
```

_Response (200 - Ok)_
```
[
    {
        "id": < organization id >,
        "name": "< organization name >",
        "createdAt": "< time stamp >",
        "updatedAt": "< time stamp >"
    },
    {
        "id": < organization id >,
        "name": "< organization name >",
        "createdAt": "< time stamp >",
        "updatedAt": "< time stamp >"
    },
    {
        "id": < organization id >,
        "name": "< organization name >",
        "createdAt": "< time stamp >",
        "updatedAt": "< time stamp >"
    }
]
```

_Response (500 - Internal Server Error)_
```
{
    "message": [
        "< error message >"
    ]
}
```

---

### PUT /organizations/:id

> Update an organization

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
{
  "name": "< new organization name >"
}
```

_Request Params_
```
{
  "id": "< organization id >"
}
```

_Response (200 - Ok)_
```
{
    "updated": {
        "id": < updated organization id >,
        "name": "< updated organization name >"
    }
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": [
        "< error message >"
    ]
}
```

---

### DELETE /organizations/:id

> Delete an organization

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
{
  "name": "< new organization name >"
}
```

_Request Params_
```
{
  "id": "< organization id >"
}
```

_Response (200 - Ok)_
```
{
    "updated": {
        "id": < updated organization id >,
        "name": "< updated organization name >"
    }
}
```

_Response (500 - Internal Server Error)_
```
{
    "message": [
        "< error message >"
    ]
}
```

---

### POST /tasks

> Create new task

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
{
  "title" : "< task title >",
  "CategoryId" : "< task category id >"
}
```

_Response (201 - Created)_
```
{
    "id": < new task id >,
    "title": "< new task title >",
    "CategoryId": < new task category id >,
    "UserId": < new task user id >,
    "OrganizationId": < new task organization id >
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "< error message >"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "err": [
        "< error message >"
    ]
}
```

---

### GET /tasks/:CategoryId

> Get task per category

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
  CategoryId: "< category id >"
}
```

_Response (200 - Ok)_
```
[
    {
        "id": < task id >,
        "title": "< task title >",
        "CategoryId": < task category id >,
        "UserId": < task user id >,
        "OrganizationId": < task organization id >,
        "createdAt": "2021-01-12T13:41:46.877Z",
        "updatedAt": "2021-01-12T13:41:46.877Z"
    },
    {
        "id": < task id >,
        "title": "< task title >",
        "CategoryId": < task category id >,
        "UserId": < task user id >,
        "OrganizationId": < task organization id >,
        "createdAt": "2021-01-12T13:41:46.877Z",
        "updatedAt": "2021-01-12T13:41:46.877Z"
    },
]
```

_Response (500 - Internal Server Error)_
```
{
    "err": [
        "< error message >"
    ]
}
```

---

### GET /tasks/focus/:TaskId

> Get specific task

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
  TaskId: "< task id >"
}
```

_Response (200 - Ok)_
```
{
    "id": < task id >,
    "title": "< task title >",
    "CategoryId": < task category id >,
    "UserId": < task user id >,
    "OrganizationId": < task organization id >,
    "createdAt": "2021-01-12T13:41:46.877Z",
    "updatedAt": "2021-01-12T13:41:46.877Z"
},
```

_Response (500 - Internal Server Error)_
```
{
    "err": [
        "< error message >"
    ]
}
```

---

### PUT /tasks/:TaskId

> Update a task

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
{
  "title" : "< task title >",
  "CategoryId" : "< task category id >"
}
```

_Response (200 - Ok)_
```
{
  "updated": {
    "id": < new task id >,
    "title": "< new task title >",
    "CategoryId": < new task category id >,
    "UserId": < new task user id >,
    "OrganizationId": < new task organization id >
  }
}
```

_Response (400 - Bad Request)_
```
{
    "message": [
        "< error message >"
    ]
}
```

_Response (500 - Internal Server Error)_
```
{
    "err": [
        "< error message >"
    ]
}
```

---

### DELETE /tasks/:TaskId

> Delete a task

_Request Header_
```
{
  access_token: "< jwt access token >"
}
```

_Request Body_
```
not needed
```

_Request Params_
```
{
  TaskId: "< task id >"
}
```

_Response (200 - Ok)_
```
{
    "message": "Task < task id > successfully deleted"
}
```

_Response (500 - Internal Server Error)_
```
{
    "err": [
        "< error message >"
    ]
}
```

---