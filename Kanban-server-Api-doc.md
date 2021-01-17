# Kanban Server
Aplikasi ini adalah aplikasi yang memvisualisasikan komunikasi dan pengendalian serangkaian aliran aktivitas di produksi sehingga memungkinkan semua orang untuk melihat aliran aktivitas tersebut dan menyesuaikannya sesuai dengan kebutuhan.

&nbsp;

## List of Endpoints
```
- POST /register
- POST /login
- POST /task
- GET /task
- GET /task/:id
- PUT /task/:id
- PATCH /task/:id
- DELETE /task/:id
```

&nbsp;

## RESTfull Endpoints
### POST /register
> Create an Account

_Request Header_
```
{
    <not needed>
}
```

_Request Body_
```
{
    "fullname": "<fullname get from insert into>",
    "email": "<email get from insert into>",
    "phoneNumber": "<phoneNumber get from insert into>",
    "password": "<password get from insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "email": "<posted email>"
    "phoneNumber": "<posted phoneNumber>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Fullname is required"
  "message": "Email is required"
  "message": "Not an Email"
  "message": "Phone Number is required"
  "message": "Password is required"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---



### POST /login
> Verify an account and generate an access token

_Request Header_
```
{
    <not needed>
}
```

_Request Body_
```
{
    "email": "<email get from insert into>",
    "password": "<password get from insert into>",
}
```

_Response (200 - OK)_
```
{
    "access_token": <access_token id by system>,
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Invalid Email or Password"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### POST /task
> Create a Task

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title get from insert into>",
    "description": "<description get from insert into>",
    "Category": "<status get from insert into>",
}
```

_Response (201 - Created)_
```
{
    "id": <given id by system>,
    "title": "<posted title>",
    "description": "<posted description>",
    "category": "<posted category>",
    "UserId: "given UserId by system>",
    "createdAt": "<given createdAt by system>",
    "updatedAt": "<given updatedAt by system>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required"
  "message": "Description is required"
  "message": "Category is required"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---


### GET /task
> Get all task
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
_Response (200 - OK)_
```
[
    {
      "id": <posted id>,
      "title": "<posted title>",
      "description": "<posted description>",
      "category": "<posted category>",
      "UserId: "posted UserId>",
      "createdAt": "<posted createdAt>",
      "updatedAt": "<posted updatedAt>",
    },
    {
        ...
    }
]
```
_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### GET /task/:id
> Get a task by id

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

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
    "id": <posted id>,
    "title": "<posted title>",
    "description": "<posted description>",
    "category": "<posted category>",
    "UserId: "posted UserId>",
    "createdAt": "<posted createdAt>",
    "updatedAt": "<posted updatedAt>",
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```
---

### PUT /task/:id

> Update task by id

_Request Header_
```
{
    "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "title": "<title get from update>",
    "description": "<description get from update>",
    "category": "<category get from update>"
}
```

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
   "message": "Task has been updated"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Title is required"
  "message": "Description is required"
  "message": "Category is required"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### PATCH /task/:id
> Update category task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
    "category": "<category to get update>"
}
```

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
    "message": "Task category has been updated"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "Category is required"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```
---

### DELETE /task/:id
> Delete a task by id

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

_Request Params_
```
{
    "id": "<id get from request params>"
}
```

_Response (200 - OK)_
```
{
    "message:" "Task Success to Deleted"
}
```

_Response (404 - Not Found)_
```
{
  "message": "Data Not Found"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "Internal Server Error"
}
```