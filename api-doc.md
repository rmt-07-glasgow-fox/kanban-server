# Task List App-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`

And routes below need authentication
- `POST /tasks`
- `GET /tasks`
- `DELETE /tasks/:id`
- `PATCH /tasks`
- `PUT /tasks`

And routes below need authorization
- `DELETE /tasks/:id`
- `PATCH /tasks/:id`
- `PUT /tasks/:id`


### POST /register

Request:

- data:

```json
{
  "name":"string",
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
  "name": "string",
  "email": "string"
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
  "access_token": "string"
}
```

### POST /tasks
Request:

- headers: access_token

- data:

```json
{
  "title": "Membuat Donut",
  "category": "Backlog"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
    "id": 3,
    "title": "Membuat Donut",
    "category": "Backlog",
    "UserId": 4,
    "updatedAt": "2021-01-14T07:06:36.663Z",
    "createdAt": "2021-01-14T07:06:36.663Z",
    "date": "2021-01-14T07:06:36.663Z"
}
```

### GET /tasks

Description: Get all current tasks in user passwords

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
        "id": 1,
        "title": "Membuat Donut",
        "category": "Done",
        "date": "2021-01-13T07:11:14.715Z",
        "UserId": 1,
        "createdAt": "2021-01-13T07:11:14.713Z",
        "updatedAt": "2021-01-13T07:11:14.713Z"
    }
]
```

### DELETE /tasks/:id

description: 
  Delete one of the current logged in user password. (cannot delete another user password)

Request:

- headers: access_token
- params: 
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Task has been deleted"
}
```

### PUT /tasks/:id

description: 
  Edit one of the current logged in user password. (cannot edit another user tasks)

Request:

- headers: access_token
- params: 
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Task has been updated"
}
```

### PATCH /tasks/:id

description: 
  Edit one of the current logged in user password. (cannot edit another user tasks)

Request:

- headers: access_token
- params: 
  - id: integer (required)
- data:

```json
{
  "title": "Membuat Donut",
  "category": "Backlog"
}
```

Response:

- status: 200
- body:

```json
{
    "message": "Task has been updated"
}
```
