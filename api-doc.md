# kanban-server

List of available endpoints:
​
- `POST /users/register`
- `POST /users/login`
- `POST /users/GLogin`

And routes below need authentication
- `POST /tasks`
- `GET /tasks`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`

### POST /users/register

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
```

### POST /users/login

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
  "access_token": "string",
  "username": "string"
}
```

### POST /users/GLogin

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
  "access_token": "string",
  "username": "string"
}
```

### POST /tasks
Request:

- headers: access_token

- data:

```json
{
  "title": "string",
  "category": "string",
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "title": "string",
  "category": "string",
  "UserId": "integer",
}
```

### GET /tasks

Description: Get all current tasks from every user

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
        "id": "integer",
        "title": "string",
        "category": "string",
        "UserId": "integer",
        "createdAt": "2020-04-20T03:26:40.438Z",
        "updatedAt": "2020-04-20T03:26:40.438Z"
    }
]
```

### PATCH /tasks/:id

Description: Change category of task

Request:

- headers:
  - access_token: string
  
- params:
  - id: integer


Response:

- status: 200
- body:
  ​

```json
[
    {
        "id": "integer",
        "title": "string",
        "category": "string",
        "UserId": "integer",
        "createdAt": "2020-04-20T03:26:40.438Z",
        "updatedAt": "2020-04-20T03:26:40.438Z"
    }
]
```

### DELETE /tasks/:id

Description: Delete task

Request:

- headers:
  - access_token: string
  
- params:
  - id: integer


Response:

- status: 200
- body:
  ​

```json
[
    {
        "message": "Task Deleted"
    }
]
```