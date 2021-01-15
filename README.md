# KANBAN App Server
KANBAN

## Endpoints
- `POST /register`
- `POST /login`
- `POST /googleLogin`

- `POST /tasks`
- `GET /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`


# REST API

## POST /register

> Register a new account

_Request Header_
```json
```

_Request Body_
```json
{
  "email": "admin10@mail.com",
  "password": "qweqwe"
}
```
### Success

_Response (201 - Created)_
```json
{
  "id": 6,
  "email": "admin10@mail.com",
}
```
### Error

_Response (400 - Bad Request)_
```json
{
  "message": [
    "Email address already in use!",
    "Invalid email format",
    "Password must contains at least 6 characters"
  ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---

## POST /login

> Log into an account

_Request Header_
```json
```

_Request Body_
```json
{
  "email": "admin10@mail.com",
  "password": "qweqwe"
}
```
### Success

_Response (200 - Success)_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEwQG1haWwuY29tIiwiaWF0IjoxNjEwNTYxNDg5fQ.eZhpSlA4rlExSK9Oeq2Crj4kDREC_WKlcc1eWljEzAw"
}
```
### Error

_Response (400 - Bad Request)_
```json
{
  "message": "Invalid password"
}
```

_Response (404 - Bad Request)_
```json
{
  "message": "Email not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---

## POST /loginGoogle

> Create new tasks
_Request Header_
```json
```

_Request Body_
```json
{
  "id_token": "<id_token>"
}
```
### Success

_Response (200 - Success)_
```json
{
  "access_token": "<access_token>"
}
```
### Error

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---

## POST /tasks

> Create new task
_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEwQG1haWwuY29tIiwiaWF0IjoxNjEwNTYxNDg5fQ.eZhpSlA4rlExSK9Oeq2Crj4kDREC_WKlcc1eWljEzAw"
}
```

_Request Body_
```json
{
  "title": "Kanban",
  "category": "backlogs"
}
```
### Success

_Response (201 - Created)_
```json
{
    "id": 3,
    "title": "Kanban",
    "category": "backlogs",
    "UserId": 1,
    "message": "Task created successfully!"
}
```
### Error

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---

## GET /tasks

> Show all tasks

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEwQG1haWwuY29tIiwiaWF0IjoxNjEwNTYxNDg5fQ.eZhpSlA4rlExSK9Oeq2Crj4kDREC_WKlcc1eWljEzAw"
}
```

_Request Body_
```json
```
### Success

_Response (200 - Success)_
```json
[
  {
    "id": 30,
    "title": "Test",
    "category": "developments",
    "UserId": 1,
    "User": {
        "email": "admin10@mail.com"
    }
  },
  {
    "id": 11,
    "title": "mantappu jiwa",
    "category": "backlogs",
    "UserId": 1,
    "User": {
        "email": "admin10@mail.com"
    }
  }
]
```
### Error

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---

## PATCH /tasks/:id

> Change category

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEwQG1haWwuY29tIiwiaWF0IjoxNjEwNTYxNDg5fQ.eZhpSlA4rlExSK9Oeq2Crj4kDREC_WKlcc1eWljEzAw"
}
```

_Request Body_
```json
{
  "category": "developments"
}
```
### Success

_Response (200 - Success)_
```json
{
  "message": "Task moved successfully",
  "updated": "developments"
}
```
### Error

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---

## PUT /tasks/:id

> Edit a task

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEwQG1haWwuY29tIiwiaWF0IjoxNjEwNTYxNDg5fQ.eZhpSlA4rlExSK9Oeq2Crj4kDREC_WKlcc1eWljEzAw"
}
```

_Request Body_
```json
{
  "title": "Halo, ini aku editan"
}
```
### Success

_Response (200 - Success)_
```json
{
    "message": "Task updated successfully",
    "updated": "Halo, ini aku editan"
}
```
### Error

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---

## DELETE /tasks/:id

> Delete a task

_Request Header_
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhZG1pbjEwQG1haWwuY29tIiwiaWF0IjoxNjEwNTYxNDg5fQ.eZhpSlA4rlExSK9Oeq2Crj4kDREC_WKlcc1eWljEzAw"
}
```

_Request Body_
```json
```
### Success

_Response (200 - Success)_
```json
{
  "message": "Task deleted successfully!"
}
```
### Error

_Response (404 - Not Found)_
```json
{
  "message": "Error 404: task not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "Internal error!"
}
```

---