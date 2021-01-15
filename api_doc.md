# Kanban App Server
Kanban App is an application to manage your tasks. This app has : 
* RESTful endpoint for Kanban List's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints
### GET /tasks

> Get all tasks list

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```json
[
  {
    "id": 3,
    "title": "qweqwe",
    "description": "",
    "createdAt": "2021-01-15T09:07:43.412Z",
    "updatedAt": "2021-01-15T09:07:43.412Z",
    "CategoryId": 1,
    "UserId": 1,
    "User": {
        "id": 1,
        "email": "wow@gmail.com"
    },
    "Category": {
        "id": 1,
        "name": "Backlog"
    }
  },
  {
    "id": 1,
    "title": "edite",
    "description": "edited",
    "createdAt": "2021-01-15T07:49:23.021Z",
    "updatedAt": "2021-01-15T09:31:21.924Z",
    "CategoryId": 4,
    "UserId": 1,
    "User": {
        "id": 1,
        "email": "wow@gmail.com"
    },
    "Category": {
        "id": 4,
        "name": "Complete"
    }
  }
]
```

_Response (400 - Bad Request)_
```json
{
    "name": "error",
    "message": "invalid signature"
}
```
_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

---
### POST /tasks

> Create new tasks

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
}
```

_Response (201 - Created)_
```json
{
  "id": 6,
  "title": "wewwe",
  "description": "new desc",
  "CategoryId": null,
  "UserId": 1,
  "updatedAt": "2021-01-15T12:11:32.085Z",
  "createdAt": "2021-01-15T12:11:32.085Z"
}
```

_Response (400 - Bad Request)_
```json
{
  "name": "error",
  "message": "invalid signature"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### PUT /tasks/:id

> Edit specified tasks

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "title": "<title to get insert into>",
  "description": "<description to get insert into>",
}
```

_Request Params_
```json
{
  "id": "<Task id>"
}
```

_Response (200 - OK)_
```json
{
    "id": 1,
    "title": "qq",
    "description": "edited",
    "createdAt": "2021-01-15T07:49:23.021Z",
    "updatedAt": "2021-01-15T12:13:07.974Z",
    "CategoryId": 4,
    "UserId": 1
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```
---
### PATCH /tasks/:id

> Edit one attributes of specified task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "CategoryId": "<Category to be inserted>",
}
```

_Request Params_
```json
{
  "id": "<Task id>"
}
```

_Response (200 - OK)_
```json
{
    "id": 2,
    "title": "test title",
    "description": "qweqwe",
    "createdAt": "2021-01-15T07:55:23.037Z",
    "updatedAt": "2021-01-15T12:15:06.675Z",
    "CategoryId": 3,
    "UserId": 2
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```

### DELETE /tasks/:id

> Delete one attributes of specified task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
  not needed
```

_Request Params_
```json
{
  "id": "<Task id>"
}
```

_Response (200 - OK)_
```json
{
  "message": "todo success to delete"
}
```

_Response (401 - Unauthorized)_
```json
{
  "message": "Unauthorized"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "message": "internal server error"
}
```