# hacktivPasswordManager-server

​
List of available endpoints:
​
- `POST /register`
- `POST /login`
- `POST /loginGoogle`

And routes below need authentication

- `GET /tasks`
- `POST /tasks`
- `DELETE /tasks/:id`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`

- `GET /category`
- `POST /category`
- `DELETE /category/:id`
- `PUT /category/:id`

### POST /register

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
  "id": "integer",
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
  "title": "Google",
  "description": "apa ya",
  "asignTo": "qweqwe",
  "categoryId": 1,
  "userId": 2
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "id": 1,
  "title": "Google",
  "description": "apa ya",
  "asignTo": "qweqwe",
  "categoryId": 1,
  "userId": 2
}
}
```

### GET /tasks

Description: Get all tasks

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
        "title": "Google",
        "description": "apa ya",
        "asignTo": "qweqwe",
        "categoryId": 1,
        "userId": 2,
        "createdAt": "2020-04-20T03:26:40.438Z",
        "updatedAt": "2020-04-20T03:26:40.438Z"
    }
]
```

### DELETE /tasks/:id

description: 
  Delete one of the current logged in user password. (cannot delete another user password)

Request:

- headers: access_token
- params: 
  - taskId: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Delete Password successfull"
}
```

### PUT /tasks/:id

Request:

- headers: access_token
- params: 
  - taskId: integer (required)
- data:

```json
{
  "title": "Google",
  "description": "apa ya",
  "asignTo": "qweqwe",
  "categoryId": 1
}
```

Response:

- status: 200
- body:

```json
{
    "message": "Update successfull"
}
```

### PATCH /tasks/:id

Request:

- headers: access_token
- params: 
  - taskId: integer (required)
- data:

```json
{
  "categoryId": 1
}
```

Response:

- status: 200
- body:

```json
{
    "message": "Change status successfull"
}
```


### POST /category
Request:

- headers: access_token

- data:

```json
{
  "category": "apa"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
  "id": 1,
  "category": "apa"
}
}
```

### GET /category

Description: Get all category

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
        "category": "apa",
        "createdAt": "2020-04-20T03:26:40.438Z",
        "updatedAt": "2020-04-20T03:26:40.438Z"
    }
]
```

### DELETE /category/:id

description: 
  Delete one of the current logged in user password. (cannot delete another user password)

Request:

- headers: access_token
- params: 
  - categoryId: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "Delete Password successfull"
}
```

### PUT /category/:id

Request:

- headers: access_token
- params: 
  - categoryId: integer (required)
- data:

```json
{
  "category": "apa"
}
```

Response:

- status: 200
- body:

```json
{
    "message": "Update successfull"
}
```