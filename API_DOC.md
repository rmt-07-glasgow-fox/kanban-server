# Kanboard Kanban by ralfarios. API Documentation
For make you easier to develop this app, I make a documentation about API endpoints.


| Route         | Method      | Description                   |
| ------------- | ----------- | ----------------------------- |
| `/register`   | POST        | For register user             |
| `/login`      | POST        | For login user                |
| `/glogin`     | POST        | For login user with Google    |
| `/getuser`    | GET         | For get user information      |
| `/task`       | POST        | For add task to list          |
| `/task`       | GET         | For see task list             |
| `/task/:id`   | GET         | For see detailed              |
| `/task/:id`   | PUT         | For update task               |
| `/task/:id`   | PATCH       | For change status task        |
| `/task/:id`   | DELETE      | For delete task               |
<br>


## Detailed Endpoints
### POST /register
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (201)_
```json
{
  "id": "<your id>",
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>"
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

### POST /login
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "email": "<your email>",
  "password": "<your password>"
}
```

_Response (200)_
```json
{
"access_token": "<your access token>"
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

### POST /glogin
_Request Header_
```
Unneeded
```

_Request Body_
```json
{
  "id_token": "id_token"
}
```

_Response (201)_
```json
Payload from Google
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### GET /getuser
_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
  Unneeded
```

_Response (200)_
```json
{
  "id": "<your id>",
  "firstname": "<your firstname>",
  "lastname": "<your lastname>",
  "email": "<your email>",
  "profpic": "<your profpic link>"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```


### POST /task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<task title>",
  "description": "<task description>",
  "duedate": "<task duedate>",
  "category" : "<task category>"
}
```

_Response (201)_
```json
{
  "id" : "<task id>",
  "title": "<task title>",
  "description": "<task description>",
  "duedate": "<task duedate>",
  "category" : "<task category>",
  "UserId": "<your id>",
  "updatedAt": "<date>",
  "createdAt": "<date>",
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```


### GET /task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
[
  {
    "id" : "<task id>",
    "title": "<task title>",
    "description": "<task description>",
    "duedate": "<task duedate>",
    "category" : "<task category>",
    "UserId": "<your id>",
    "updatedAt": "<date>",
    "createdAt": "<date>",
  },
  {
    "id" : "<task id>",
    "title": "<task title>",
    "description": "<task description>",
    "duedate": "<task duedate>",
    "category" : "<task category>",
    "UserId": "<your id>",
    "updatedAt": "<date>",
    "createdAt": "<date>",
  },
  ...
]
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### GET /task/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "id" : "<task id>",
  "title": "<task title>",
  "description": "<task description>",
  "duedate": "<task duedate>",
  "category" : "<task category>",
  "UserId": "<your id>",
  "updatedAt": "<date>",
  "createdAt": "<date>",
}
```

_Response (401)_
```json
{
  "message": "Error 404: You don't have permission to access this task"
}
```

_Response (404)_
```json
{
  "message": "Error 404: Task List not found"
}
```

### PUT /task/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<task title>",
  "description": "<task description>",
  "duedate": "<task duedate>",
  "category" : "<task category>"
}
```

_Response (200)_
```json
{
  "id" : "<[new] task id>",
  "title": "<[new] task title>",
  "description": "<[new] task description>",
  "duedate": "<[new] task duedate>",
  "category" : "<task category>",
  "UserId": "<your id>",
  "updatedAt": "<[new] date>",
  "createdAt": "<date>",
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Response (401)_
```json
{
  "message": "Error 404: You don't have permission to access this task"
}
```

_Response (404)_
```json
{
  "message": "Error 404: Task List not found"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### PATCH /task/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "status": "<Task status>"
}
```

_Response (200)_
```json
{
  "id" : "<task id>",
  "title": "<task title>",
  "description": "<task description>",
  "duedate": "<task duedate>",
  "category" : "<[new] task category>",
  "UserId": "<your id>",
  "updatedAt": "<[new] date>",
  "createdAt": "<date>",
}
```

_Response (400)_
```json
{
  "message": "Error 400: Bad Request"
}
```

_Response (401)_
```json
{
  "message": "Error 404: You don't have permission to access this task"
}
```

_Response (404)_
```json
{
  "message": "Error 404: Task List not found"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```

### DELETE /task/:id

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
Unneeded
```

_Response (200)_
```json
{
  "message": "Task success to delete"
}
```

_Response (401)_
```json
{
  "message": "Error 404: You don't have permission to access this task"
}
```

_Response (404)_
```json
{
  "message": "Error 404: Task List not found"
}
```

_Response (500)_
```json
{
  "message": "Error 500: Internal Server Error"
}
```