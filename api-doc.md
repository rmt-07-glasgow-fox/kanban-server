# Kanban Board Web App Server
Kanban board is a management tool that help teams to organize their project. This app has : 
* RESTful endpoint for task's CRUD operation
* JSON formatted response

# URL
    http://localhost:3000

# Method

## Available Endpoints List
- `POST /register`
- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PATCH /tasks/description/:id`
- `PATCH /tasks/category/:id`
- `DELETE /tasks/:id`

---
### POST /register

> User register

### *Request Header*
```Not Needed```

### *Request Body*
 ```javascript
{
    name: "<user name>",
    email: "<user email>",
    password: "<user password>"
}
```

### *Success Response*
__Response (201 - User Created)__
```javascript
[
  {
    "id": 1,
    "name": "<user name>",
    "email": "<user email>",
  },
  {
    "id": 2,
    "name": "<asset name>",
    "email": "<user email>",
  }
]
```

### *Error Responses*
__Response (400 - Bad Request)__
```javascript
{
  message: "Invalid request"
}
```

__Response (403 - Forbidden)__
```javascript
{
  message: "Email already in use"
}
```

__Response (500 -  Internal Server Error)__
```javascript
{
    message: "Internal server error"
}
```
---
### POST /login

> User login

### *Request Header*
```Not Needed```

### *Request Body*
 ```javascript
{
  email: "<user email>",
  password: "<user password>"
}
```

### *Success Response*
__Response (201 - Access Token Created)__
```javascript
{
  access_token: "<user access token>"
}
```

### *Error Responses*
__Response (400 - Bad Request)__
```javascript
{
  message: "Invalid request"
}
```

__Response (404 - Not Found)__
```javascript
{
  message: "Invalid email / password"
}
```

__Response (500 - Bad Request)__
```javascript
{
  message: "Internal server error"
}
```
---
### GET /tasks
> Get all tasks

### *Request Header*
```javascript
{
  access_token: "<user access token">
}
```

### *Request Body*
```Not Needed```

### *Success Response*
__Response (200)__
 ```javascript
[
  {
    id: 1,
    description: "<task description>",
    category: "<task category>",
    userId: "<user id>",
    updatedAt: "<updated timestamp>"
  },
  {
    id: 2,
    description: "<task description>",
    category: "<task category>",
    userId: "<user id>",
    updatedAt: "<updated timestamp>"
  }
]

```

### *Error Responses*
__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error"
}
```
---
### POST /tasks
> Create a new task

### *Request Header*
```javascript
{
  access_token: "<user access token">
}
```
### *Request Body*
```javascript
{
  description: "<task description>",
  category: "<task category>"
}
```
### *Success Response*
__Response (201 - Task Created)__
```javascript
{
  id: "<task id>",
  description: "<task description>",
  category: "<task category>",
  userId: "<user id>",
  updatedAt: "<updated timestamp>"
}
```
### *Error Responses*
__Response (500 - Internal Server Error)__
```javascript
{
  message: "Internal server error",
}
```
---
### GET /tasks/:id
> Get task by id

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```
### *Request Body*
```Not needed```
### *Success Response*
__Response (200)__
 ```javascript
{
  id: "<task id>",
  description: "<task description>",
  category: "<task category>",
  userId: "<user id>",
  updatedAt: "<task timestamp>"
}
```
### *Error Responses*
__Response (404 - Task Not Found)__
```javascript
{
  message: "Task not found"
}
```
__Response (500 - Internal Server Error)__ 
```javascript
{
  message: "Internal server errror"
}
```

---
### PATCH /tasks/description/:id
> Update task description

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```
### *Request Body*
```javascript
{
  description: "<task description>"
}
```
### *Success Response*
__Response (200)__
```javascript
{
  id: "<task id>",
  description: "<task description>",
  category: "<task category>",
  userId: "<user id>",
  updatedAt: "<task timestamp>"
}
```
### *Error Responses*
__Response (404 - Task Not Found)__
```javascript
{
  message: "Task not found"
}
```
__Response (500 - Internal Server Error)__ 
```javascript
{
  message: "Internal server errror"
}
```
---
### PATCH /tasks/category/:id
> Update task category

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```
### *Request Body*
```javascript
{
  category: "<task category>"
}
```
### *Success Response*
__Response (200)__
```javascript
{
  id: "<task id>",
  description: "<task description>",
  category: "<task category>",
  userId: "<userId>",
  updatedAt: "<task timestamp>"
}
```
### *Error Responses*
__Response (404 - Task Not Found)__
```javascript
{
  message: "Task not found"
}
```
__Response (500 - Internal Server Error)__ 
```javascript
{
  message: "Internal server errror"
}
```
---
### DELETE /tasks/:id
> Delete task

### *Request Header*
```javascript
{
  access_token: "<user access token>"
}
```
### *Request Body*
```Not needed```
### *Success Response*
__Response (200 - Deleted Task)__
 ```javascript
{
  id: "<task id>",
  description: "<task description>",
  category: "<task category>",
  userId: "<user id>",
  createdAt: "<task timestamp",
  updatedAt: "<task timestamp>"
}
```
### *Error Responses*
__Response (404 - Task Not Found)__
```javascript
{
  message: "Task already been deleted"
}
```
__Response (500 - Internal Server Error)__ 
```javascript
{
  message: "Internal server errror"
}
```

