# KANBAN

## List endpoitns
>USER
- `POST /login`
- `POST /register`

>Category
- `GET /category`
- `POST /category`

>TASK
- `POST /task`
- `GET /task`
- `PUT /task/:id`
- `DELETE /task/:id`

### login /login

_Request Header_
```json
    (-)
```
_Request Params_
```json
    (-)
```
_Request Body_
```json
    email: <string>,
    password: <string>
```
_Response (200)_
```json
  {
      "access_token": <string>
  }
```
_Response (401 - Not Found)_
```json
  {
    "message": "Email or password is undefined"
  }
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```
---

### Register /register
_Request Header_
```json
    (-)
```
_Request Params_
```json
    (-)
```
_Request Body_
```json
  {
    "email": <string>,
    "password": <string>,
    "username": <string>
  }
```
_Response (200)_
```json
  {
    "id": <Increament by default>,
    "username": <string>,
    "username": <string>
  }
```
_Response (400 - Bad Request)_
```json
  {
    "message": "This email already register"
  }
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```
---

### POST /Task
- `POST /Task`

> Create new Task

_Request Header_
```json
  {
    "access_token": <string>
  }
```
_Request Body_
```json
  {
    "title": "Take a Nap",
    "CategoryId": <integer by Categories id>
  }
```
_Response (201 - Created)_
```json
  {
    "title": "Take a Nap",
    "CategoryId": <integer by Categories id>,
    "date": "2021-01-07T00:00:00.000Z" <by default on Controller>
  }
```
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```

---
### GET /Task
> Get all Task

_Request Header_
```json
  {
    "access_token": <string>
  }
```
_Request Body_
```
  no needed
```
_Response (200)_
```json
[
  { 
    "id": <given id by system>,
    "title": "<posted name>",
    "date": "2020-03-20T07:15:12.149Z",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
  }
]
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```

### PUT /task/:id
> Edit Task by id from Params 

_Request Header_
```json
  {
    "access_token": <string>
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  {
    "title": "New Take a Nap",
    "CategoryId": 1
  }
```
_Response (200)_
```json
  {
    "title": "New Take a Nap",
    "date": "2021-01-07T00:00:00.000Z", <by default on controller>
    "CategoryId": 1
  }
```
_Response (404 - Not Found)_
```json
  {
    "message": "Data is undefind"
  }
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```
---

### DELETE /task/:id

> Remove task by id from Params 

_Request Header_
```json
  {
    "access_token": <string>
  }
```
_Request Params_
```json
  {
    "id": 1
  }
```
_Request Body_
```json
  no needed
```
_Response (200)_
```json
  {
    "message": 'todo success deleted'
  }
```
_Response (404 - Not Found)_
```json
  {
    "message": "Data is undefind"
  }
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```
---

### GET /category
>Show Category

_Request Header_
```json
  {
    "access_token": <string>
  }
```
_Request Params_
```json
    (-)
```
_Request Body_
```json
    {
        "name": <string>
    }
```
_Response (200)_
```json
    {
        "id": <set by default>,
        "username,
        email
    }
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```

### POST /category
>create category
_Request Header_
```json
  {
    "access_token": <string>
  }
```
_Request Params_
```json
    (-)
```
_Request Body_
```json
  {
    "name": "New Take a Nap",
  }
```
_Response (200)_
```json
  {
    "msg": "${name} succsesfully created"
  }
```
_Response (500 - Internal Server Error)_
```json
  {
    "message": "Error in internal server"
  }
```