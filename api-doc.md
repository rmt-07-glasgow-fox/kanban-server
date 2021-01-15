# kanban-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /login/google`

And routes below need authentication
- `POST /tasks`
- `GET /tasks`
- `DELETE /tasks/:id`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`

### POST /register

Request:

- data:

```json
{
  "fullName": "string",
  "email": "string",
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
  "fullName": "string",
  "email": "string",
  "accessToken": "string"
}
```

### POST /login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "accessToken": "string",
  "fullName": "string"
}
```

### POST /login/google

Request:

- data:

```json
{
  "id_token": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "accessToken": "string",
  "fullName": "string",
  "id": "integer",
  "email": "string"
}
```

### POST /tasks
Request:

- headers: access_token

- data:

```json
{
  "title": "Google",
  "description": "www.google.com"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "title": "Google",
  "description": "www.google.com",
  "status": "backlog"
}
```

### GET /tasks

Description: Get all tasks in server

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
[
    {
  "title": "Google",
  "description": "www.google.com",
  "status": "backlog",
  "UserId": 1,
  "User": {
    "id": 1,
    "fullName": "user",
    "email": "test@email.com"
  }
    }
]
```

### GET /tasks/:id

Description: Get task by id

Request:

- headers:
  - access_token: string
- params:
  - id: integer (required)

Response:

- status: 200
- body:
  ​

```json
{
  "title": "Google",
  "description": "www.google.com",
  "status": "backlog",
  "UserId": 1,
  "User": {
    "id": 1,
    "fullName": "user",
    "email": "test@email.com"
  }
}
```

### PUT /tasks/:id

Description: Update task by id

Request:

- headers:
  - access_token: string
- params:
  - id: integer (required)
- data:

```json
{
  "title": "Google",
  "description": "www.google.com",
  "status": "backlog"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "title": "Google",
  "description": "www.google.com",
  "status": "backlog",
  "UserId": 1
}
```

### PATCH /tasks/:id

Description: Update task status by id

Request:

- headers:
  - access_token: string
- params:
  - id: integer (required)
- data:

```json
{
  "status": "backlog"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "title": "Google",
  "description": "www.google.com",
  "status": "backlog",
  "UserId": 1
}
```

### DELETE /tasks/:id

description:
  Delete one of the current logged in user task. (cannot delete another user task)

Request:

- headers: access_token
- params:
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "task success to delete"
}
```
