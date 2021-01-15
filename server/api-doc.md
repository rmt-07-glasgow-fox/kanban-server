# Kanban Board App
An Application for managing your works or tasks
​
List of available endpoints:
​
Need an Authentication
- `POST /register`
- `POST /login`
- `POST /loginGoogle`
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`

Need an Authorization
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

### POST /register

Request:

- data:

```json
{
  "email": "string",
  "username": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string",
  "username": "string"
}

Errors:
```json

{
"message": "Invalid email/password",
"code": 400,
"from": "Controller User: register user"
},
{
"message": "Internal server error",
"code": 500,
"from": "Controller User: register user"
}
```

### POST /login

Request:

- data:

```json
{
  "validator": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "email": "string",
    "access_token": "jwt string"
}

Errors:
```json

{
"message": "Invalid email/password",
"code": 401,
"from": "Controller User: login user"
},
{
"message": "Invalid email/password",
"code": 400,
"from": "Controller User: login user"
},
{
"message": "Internal server error",
"code": 500,
"from": "Controller User: login user"
}

```

### POST /loginGoogle

Description:
  login social via google auth

Request:

- body: id_token (integer)

- response Google:
```json
{
  "email": "string"
}

Response:

- status: 200
- body:
  ​

```json
{
    "id": "integer",
    "email": "string",
    "access_token": "jwt string"
}

Errors:
```json
not needed format

```

### GET /tasks

description: 
  get all task list (all category)

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json
{
  "title": "having a glass of milk",
  "category": "doing",
  "description": "having energy",
  "due_date": "2020-05-04T17:00:00.000Z"
}

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Task: show all task"
}

```

### POST /tasks

description: 
  create task with data from client

Request:

- userId: user_id (integer)

- headers: access_token (string)

- body:
```json
{
"title": "string",
"category": "string",
"description": "string",
"due_date": "date/time stampz"
}

Response:

- status: 201
- body:

```json
{
  "title": "having a glass of milk",
  "category": "doing",
  "description": "having energy",
  "due_date": "2020-05-04T17:00:00.000Z"
}

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Task: create task"
}

```

### GET /tasks/:id

description: 
  get single task requested by its id

Request:

- params: id (integer)

- headers: access_token (string)

- body:
  not needed    

Response:

- status: 200
- body:

```json
{
  "title": "having a glass of milk",
  "category": "doing",
  "description": "having energy",
  "due_date": "2020-05-04T17:00:00.000Z"
}

Errors:
```json

{
"message": "Internal server error",
"code": 500,
"from": "Controller Task: show one task"
}

```

### PUT /tasks/:id

description: 
  update multiple properties of single task requested by its id 

Request:

- userId (integer)

- params: id (integer)

- headers: access_token (string)

- body:
```json
{
"title": "string",
"category": "string",
"description": "string",
"due_date": "date/time stampz"
}

Response:

- status: 200
- body:

```json
{
  "title": "having a glass of milk",
  "category": "doing",
  "description": "having energy",
  "due_date": "2020-05-04T17:00:00.000Z"
}

Errors:
```json

{
"message": "Item not found",
"code": 404,
"from": "Controller Task: update task"
},
{
"message": "Internal server error",
"code": 500,
"from": "Controller Task: update task"
}

```

### PATCH /tasks/:id

description: 
  update category property (backlog/todo/doing/done) of single task requested by its id

Request:

- params: id (integer)

- headers: access_token (string)

- body: 
```json
{
  "category": "string"
}

Response:

- status: 200
- body:

```json
{
  "title": "having a glass of milk",
  "category": "doing",
  "description": "having energy",
  "due_date": "2020-05-04T17:00:00.000Z"
}

Errors:
```json

{
"message": "Item not found",
"code": 404,
"from": "Controller Task: change category task"
},
{
"message": "Internal server error",
"code": 500,
"from": "Controller Task: change category task"
}

```

### DELETE /tasks/:id

description: 
  delete single task requested by its id

Request:

- params: id (integer)

- headers: access_token (string)

- body:
  not needed

Response:

- status: 200
- body:

```json
{ 
  "message": "Task successfully deleted"
}

Errors:
```json

{
"message": "Item not found",
"code": 404,
"from": "Controller Task: delete task"
},
{
"message": "Internal server error",
"code": 500,
"from": "Controller Task: delete task"
}

```