# Mah todo app Documentation

Kanban app is recommended tools for your manage project milestone. This app has :
* Task management
* JSON formatted response
* Google Signin
* SPA (Single Page Application)

# URL
```
Server URL : http://localhost:3000
```

## ENDPOINT

---
### POST /signup

> Create new user

_Request_
```
url: http://localhost:3000/register
```

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email to get insert into>",
  "password": "<password to get insert into>",
  "name": "<name user to get insert into>"
}
```

_Response (201 - Created)_
```
{
  "id": <given id by system>,
  "email": "<posted email>",
  "name": "<posted name>"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```

_Response (400)_
```
{
  "message": "Password is required!, Password must be more than 6 character"
}
```

_Response (400)_
```
{
  "message": "Email is required!, Email must be a format sample@mail.com"
}
```

---

### POST /signin
> User Login

_Request_
```
url: http://localhost:3000/login
```

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  "email": "<email>",
  "password": "<password>"
}
```

_Response (200)_
```
{
    "access_token": "<generated accesss token>"
}
```

_Response (401)_
```
{
  "message": "Invalid Email/Password"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```


---

### POST /googleSignin
> Login google

_Request_
```
url: http://localhost:3000/googleSignin
```

_Request Params_
```
Not needed
```

_Request Header_
```
Not needed
```

_Request Body_
```
{
  "id_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwiZW1haWwiOiJ0YWtpYmVya2hhcmlzbWFAZ21haWwuY29tIiwiaWF0IjoxNjEwMTgzOTI4fQ.F5LTn3kiMf-0CZiZh0rt-6sqddB7lRc6hJcUTgqu0aA"
}
```

_Response (200)_
```
{
    "access_token": "<generated accesss token>"
}
```

_Response (401)_
```
{
  "message": "Invalid Email/Password"
}
```

_Response (500 - Server Error)_
```
{
  "message": "Internal server error"
}
```


---

### POST /tasks
> Create new task, but you need to log in first!

_Request_
```
url: http://localhost:3000/tasks
```

_Request Params_
```
Not needed
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
{
  "name": "<name>",
  "UserId": "<CurrentUser.id>",
  "CategoryId": "<Selected CategoryId by CurrentUser>"
}
```

_Response (201)_
```
{
  "id": <given id by system>,
  "name": "<name>",
  "CurrentUserName": "<task.User.name>",
  "createdAt": "2020-01-20T07:15:12.149Z"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

### GET /tasks

> Get all tasks by selected CategoryId. But you need to log in first

_Request_
```
url: http://localhost:3000/tasks
```


_Request Header_
```
Not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  [
    {
      "id": <given id by system>,
      "name": "<name>",
      "CategoryId": 1,
      "UserId": "<UserId>",
      "createdAt": "2020-01-20T07:15:12.149Z",
    },
    {
      "id": <"...">,
      "name": "<...>",
      "CategoryId": <"...">,
      "UserId": <"...">,
      "createdAt": <"...">
    }
  ],
  [
    {
      "id": <given id by system>,
      "name": "<name>",
      "CategoryId": 2,
      "UserId": "<UserId>",
      "createdAt": "2020-01-20T07:15:12.149Z",
    },
    {
      "id": <"...">,
      "name": "<...>",
      "CategoryId": <"...">,
      "UserId": <"...">,
      "createdAt": <"...">
    }
  ],
  [
    {
      "id": <given id by system>,
      "name": "<name>",
      "CategoryId": 3,
      "UserId": "<UserId>",
      "createdAt": "2020-01-20T07:15:12.149Z",
    },
    {
      "id": <"...">,
      "name": "<...>",
      "CategoryId": <"...">,
      "UserId": <"...">,
      "createdAt": <"...">
    }
  ],
  [
    {
      "id": <given id by system>,
      "name": "<name>",
      "CategoryId": 4,
      "UserId": "<UserId>",
      "createdAt": "2020-01-20T07:15:12.149Z"
    },
    {
      "id": <"...">,
      "name": "<...>",
      "CategoryId": <"...">,
      "UserId": <"...">,
      "createdAt": <"...">
    }
  ]
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Cannot retrieve data!"
}
```
---

### GET /tasks/:id

> Find specify task by id. But you need to log in first and only to manage your own stuff (authorized to access data).

_Request_
```
url: http://localhost:3000/tasks/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
Not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <id>,
  "name": "<name>",
  "CategoryId": <CategoryId>,
  "UserId": "<UserId>",
  "createdAt": "2020-01-20T07:15:12.149Z"
}
```

_Response (404)_
```
{
  "message": "Not found"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```
---

### PUT /tasks/:id

> Replace task name. But you need to log in first and only to manage your own stuff (authorized to access data).

_Request_
```
url: http://localhost:3000/tasks/id
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
{
  "name": "<name>",
}
```

_Response (200)_
```
{
  "id": <id>,
  "name": "<name>",
  "CategoryId": <CategoryId>,
  "UserId": "<UserId>",
  "createdAt": "2020-01-20T07:15:12.149Z"
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---

### PATCH /tasks/:id

> Set status of task or (change by its Category). But you need to log in first and only to manage your own stuff.

_Request_
```
url: http://localhost:3000/tasks/id
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
{
  "CategoryId": "<CategoryId>"
}
```

_Response (200)_
```
{
  "id": <id>,
  "name": "<name>",
  "CategoryId": <CategoryId>,
  "UserId": "<UserId>",
  "createdAt": "2020-01-20T07:15:12.149Z"
}
```

_Response (400)_
```
{
  "message": <given id by system>
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---

### DELETE /tasks/:id

> Delete object/record. But you need to log in first and only delete your own stuff.

_Request_
```
url: http://localhost:3000/tasks/id
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
{
  "Content-type": "application/json"
}
```

_Request Body_
```
Not needed
```

_Response (200)_
```
{
  msg: 'Delete task successfully',
}
```

_Response (500)_
```
{
  "message": "Internal server error!"
}
```

_Response (404)_
```
{
  "message": "Data not found!"
}
```
---

### GET /categories

> Get all categories.

_Request_
```
url: http://localhost:3000/categories
```


_Request Header_
```
Not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  [
    {
      "id": <given id by system>,
      "name": "<name>",
      "createdAt": "2020-01-20T07:15:12.149Z",
      "updatedAt": "2020-01-20T07:15:12.149Z"
    },
    {
      "id": <"...">,
      "name": "<...>",
      "createdAt": <"...">
      "updatedAt": <"...">
    }
  ]
}
```

_Response (500 - Bad Request)_
```
{
  "message": "Cannot retrieve data!"
}
```
---

### GET /categories/:id

> Find specify category by id.

_Request_
```
url: http://localhost:3000/categories/1
```

_Request Params_
```
{
  "id": "1"
}
```

_Request Header_
```
Not needed
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": <id>,
  "name": "<name>",
  "createdAt": "2020-01-20T07:15:12.149Z",
  "updatedAt": "2020-01-20T07:15:12.149Z"
}
```

_Response (404)_
```
{
  "message": "Not found"
}
```

_Response (400)_
```
{
  "message": <given messages by system>
}
```
---