# Kanban Server

&nbsp;

## List of REST API
```
** USER **
* POST /login
* POST /register
* POST /loginGoogle

** TASKS **
* POST /tasks
* GET /tasks
* GET /tasks/:id
* PUT /tasks/:id
* PATCH /tasks/:id
* DELETE /tasks/:id
```
&nbsp;
## RESTfull endpoints
---

### POST /login
> Create Task

_Request Header_
```
no needed
```

_Request Body_
```
{
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (200 - Ok)_
```
{
    "access_token": "<user access token>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": ["Email or Password wrong!"]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### POST /register
> Create Task

_Request Header_
```
no needed
```

_Request Body_
```
{
    "name": "<name to get insert into>",
    "email": "<email to get insert into>",
    "password": "<password to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "name": "<posted name>",
    "email": "<posted email>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": ["Email already exists!"]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### POST /loginGoogle
> Create Task

_Request Header_
```
no needed
```

_Request Body_
```
{
    "id_token": "<google id_token to get insert into>"
}
```

_Response (200 - Ok)_
```
{
    "access_token": "<user access token>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### POST /tasks
> Create Task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title to get insert into>",
    "category": "<category to get insert into>"
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "category": "<posted category>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": ["Validation error: ..."]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### GET /tasks
> Get All Tasks Data

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
    {
        "id": <todo id>,
        "title": "<todo title>",
        "category": "<todo category>",
        "createdAt": "<todo createdAt>",
        "updatedAt": "<todo updatedAt>",
    }
    {
        "id": <todo id>,
        "title": "<todo title>",
        "category": "<todo category>",
        "createdAt": "<todo createdAt>",
        "updatedAt": "<todo updatedAt>",
    }
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### GET /tasks/:id
> Get Detail Task By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "id": <id by param>,
    "title": "<todo title>",
    "category": "<todo category>",
    "createdAt": "<todo createdAt>",
    "updatedAt": "<todo updatedAt>",
}
```

_Response (404 - Not Found)_
```
{
  "message": ["Data Not Found"]
}
```
---

### PUT /tasks/:id
> Update Data Task By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title to get update>",
    "category": "<category to get update>"
}
```

_Response (200)_
```
{
    "id": <id by param>,
    "title": "<updated title>",
    "category": "<updated category>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": ["Validation error: ..."]
}
```

_Response (404 - Not Found)_
```
{
  "message": ["Data Not Found"]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### PATCH /tasks/:id
> Update Category Task By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "category": "<category updated>"
}
```

_Response (200)_
```
{
    "id": <id by param>,
    "title": "<updated title>",
    "category": "<updated category>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": ["Validation error: ..."]
}
```

_Response (404 - Not Found)_
```
{
  "message": ["Data Not Found"]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```
---

### DELETE /tasks/:id
> Delete Data Task By Id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
    "message:" ["Success deleted!"]
}
```

_Response (404 - Not Found)_
```
{
  "message": ["Data Not Found"]
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": ["Internal Server Error"]
}
```

---