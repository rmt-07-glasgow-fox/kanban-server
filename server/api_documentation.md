# Kang Bang Apps
​
List of available endpoints:
​
- `POST /signup`
- `POST /signin`
- `POST /google`
- `GET /`
- `POST /`
- `PUT /:id`
- `DELETE /:id`
- `GET /category`
- `POST /category`
- `DELETE /category/:item`

### POST /signup

Request:

- data:

```json
{
  "name": "string",
  "password": "string",
  "email": "string"
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
  "name": "string",
  "access_token": "string",
}
```

- status: 400
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


### POST /signin

Request:

- data:

```json
{
  "password": "string",
  "email": "string"
}
```

Response:
- status: 201
- body:
  ​
```json
{
  "name": "string",
  "access_token": "string",
}
```

- status: 400
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### POST /google

Request:

- data:

```json
{
    "name":"string",
    "password": "string",
    "email": "string"
}
```

Response:
- status: 201
- body:
  ​
```json
{
  "access_token": "string",
}
```

- status: 400
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


### GET /

Request:

- data:

dont need data

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "title": "string",
  "dueDate": "date",
  "description": "string",
   "status": "string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


### POST /

Request:

- data:

```json
{
    "title":"string",
    "description": "string",
    "dueDate": "string",
    "status": "string"
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "title": "string",
  "dueDate": "date",
  "description": "string",
   "status": "string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```



### PUT /:id

Request:

- data:
params :id

```json
{
    "title":"string",
    "description": "string",
    "dueDate": "string",
    "status": "string"
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "message":"string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```



### DELETE /:id

Request:

- data:

params :id

Response:
- status: 200
- body:
  ​
```json
{
  "message":"string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```



### GET /category

Request:

- data:

dont need data

Response:
- status: 200
- body:
  ​
```json
{
  "id": "integer",
  "name": "string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


### POST /category

Request:

- data:

```json
{
    "name":"string",
}
```

Response:
- status: 200
- body:
  ​
```json
{
  "UserId": "integer",
  "name": "string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```

### DELETE /:id

Request:

- data:

params :id

Response:
- status: 200
- body:
  ​
```json
{
  "message":"string"
}
```

- status: 401
- body:
```json
{
    "message": "string"
}
```

- status: 500
- body:
```json
{
    "message": "string"
}
```


