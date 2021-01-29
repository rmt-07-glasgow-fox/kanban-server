# Kanban-server
Server for [kanban app](https://github.com/AnthonyGunardi/kanban-client), created using node.js, express, sequelize, postgres.


## URL:
https://kanban-glasgow-server.herokuapp.com


## List of available endpoints:

- `POST /register`
- `POST /login`
- `POST /googleLogin`
- `GET /tasks`
- `POST /tasks`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`


### POST /register

description: 
  register user

Request:

- data:

```json
{
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
  "id":"integer",
  "email": "string"
}
```

- status: 400
- body:
  ​

```json
{
  "message": [
    "Email Must Be Filled",
    "Input Must Be Email Address",
    "Password Must Be Filled",
    "Password Have Minimum 6 Character"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /login

description: 
  User login 

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
    "access_token": "jwt string",
    "name": "string"
}
```

- status: 401
- body:
  ​

```json
{
  "message": [
    "invalid email/password"
  ]
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /googleLogin

description: 
  sign in as Google user

Request:

- data:

```json
{
  "idToken": "google token"
}
```

Response:

- status: 200
- body:
  ​

```json
{
    "access_token": "jwt string",
    "name" : "string"
}
```

- status: 201
- body:
  ​

```json
{
    "access_token": "jwt string",
    "name" : "string"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```


### GET /tasks

description: 
  get all tasks that users have created before

Request:

- headers: access_token (string)

Response:

- status: 200
- body:

```json

  [
    {
        "id": 3,
        "title": "Sleep",
        "category": "Completed",
        "UserId": 2,
        "createdAt": "2021-01-13T11:53:42.612Z",
        "updatedAt": "2021-01-13T11:53:42.612Z",
        "UserEmail": "tes@gmail.com"
    },
    {
        "id": 2,
        "title": "Eat",
        "category": "Todo",
        "UserId": 1,
        "createdAt": "2021-01-13T11:53:33.250Z",
        "updatedAt": "2021-01-13T11:53:33.250Z",
        "UserEmail": "anthonygunardi@gmail.com"
    },
    {
        "id": 1,
        "title": "Play",
        "category": "Backlog",
        "UserId": 1,
        "createdAt": "2021-01-13T11:48:50.006Z",
        "updatedAt": "2021-01-13T11:48:50.006Z",
        "UserEmail": "anthonygunardi@gmail.com"
    }
  ]

```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### POST /tasks

description: 
  Create task that user made in form

Request:

- headers: access_token (string)
- body:

```json
{
    "title": "string",
    "category": "string",
    "UserId": "integer"
}
```

Response:

- status: 200
- body:

```json
{
    "id": 1,
    "title": "Play",
    "category": "Backlog",
    "UserId": 1,
    "createdAt": "2021-01-13T11:48:50.006Z",
    "updatedAt": "2021-01-13T11:48:50.006Z"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PUT /tasks/:id

description: 
  Update task that user requested

Request:

- headers: access_token (string)
- params: id (integer)
- body:

```json
{
    "title": "string",
    "category": "string"
}
```

Response:

- status: 200
- body:

```json
{
    "task": {
        "id": 1,
        "title": "Don't Play",
        "category": "Completed",
        "UserId": 1,
        "createdAt": "2021-01-13T11:48:50.006Z",
        "updatedAt": "2021-01-13T11:59:40.542Z"
    }
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### PATCH /tasks/:id

description: 
  Update task category 

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "task": {
        "id": 1,
        "title": "Play",
        "category": "Completed",
        "UserId": 1,
        "createdAt": "2021-01-13T11:48:50.006Z",
        "updatedAt": "2021-01-13T11:56:56.887Z"
    }
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Eerror Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```

### DELETE /tasks/:id

description: 
  Delete task

Request:

- headers: access_token (string)
- params: id (integer)

Response:

- status: 200
- body:

```json
{
    "message": "Task is Deleted Successfully"
}
```

- status: 401
- body:

```json
{
  "message": "Please Login First"
}
```
- status: 404
- body:

```json
{
  "message": "Error Not Found"
}
```

- status: 500
- body:
  ​

```json
{
  "message": "Internal Server Error"
}
```
