# kanban-server

**User**
| Method | Route            | Description                            |
| ------ | ---------------- | -------------------------------------- |
| POST   | /user/register   | Add new user                           |
| POST   | /user/login      | Login user                             |
| POST   | /user/loginGoole | Login/Register user using google oauth |

**Task**
| Method | Route                     | Description   |
| ------ | ------------------------- | ------------- |
| GET    | /task                     | Get list Task |
| POST   | /task                     | Add task      |
| DELETE | /task/:idTask             | Delete task   |
| PUT    | /task/:idTask/:idCategory | Update task   |

---
### POST /user/register 
---
> Add new user

_Request Headers_
```
not needed
```

_Request Body_
```
{
    "email": "user01@gmail.com",
    "password": "user01"
}
```

_Response( 200 )_
```
{
    "id": 5,
    "email": "user03@gmail.com"
}
```

_Response( 400 - Bad Request )_
```
{
    "message": [
        "Email is invalid format",
        "Email is empty",
        "Password is empty",
        "Password length minimum is 6 characters"
    ]
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### POST /user/login 
---
> Login user

_Request Headers_
```
not needed
```

_Request Body_
```
{
    "email": "user01@gmail.com",
    "password": "user01"
}
```

_Response( 200 )_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyMDJAZ21haWwuY29tIiwiaWF0IjoxNjA5OTI0ODg1fQ.PdvoxOqmU8s7Vl40B9UcdLg08EQL9t3O1XDyHbOsbsk"
}
```

_Response( 400 - Bad Request )_
```
{
    "message": "Invalid Password", "Email / Password is empty", "Email isn't registered"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### POST /user/loginGoogle 
---
> Login user

_Request Headers_
```
not needed
```

_Request Body_
```
{
    "id_token": "JIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyMDJAZ21h"
}
```

_Response( 200 )_
```
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiZW1haWwiOiJ1c2VyMDJAZ21haWwuY29tIiwiaWF0IjoxNjA5OTI0ODg1fQ.PdvoxOqmU8s7Vl40B9UcdLg08EQL9t3O1XDyHbOsbsk"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### GET /task
---
> Get task list

_Request Headers_
```
{
    access_token : "MOutCvMHysWtpWDi00"
}
```

_Request Body_
```
Not needed
```

_Response( 200 )_
```
[
    {
        "id": 1,
        "title": "test",
        "UserId": 1,
        "CategoryId": 2,
        "User": {
            "id": 1,
            "email": "user01@gmail.com",
            "password": "$2a$10$AbIhQuGNXK.Ne3oaziXZCOER12P8IuzuPZNertEjoEuwK/5/Q4S4.",
            "createdAt": "2021-01-12T15:52:39.486Z",
            "updatedAt": "2021-01-12T15:52:39.486Z"
        },
        "Category": {
            "id": 2,
            "category": "todo",
            "createdAt": "2021-01-12T15:53:30.428Z",
            "updatedAt": "2021-01-12T15:53:30.428Z"
        }
    },
    {
        "id": 4,
        "title": "Belajar React",
        "UserId": 1,
        "CategoryId": 1,
        "User": {
            "id": 1,
            "email": "user01@gmail.com",
            "password": "$2a$10$AbIhQuGNXK.Ne3oaziXZCOER12P8IuzuPZNertEjoEuwK/5/Q4S4.",
            "createdAt": "2021-01-12T15:52:39.486Z",
            "updatedAt": "2021-01-12T15:52:39.486Z"
        },
        "Category": {
            "id": 1,
            "category": "backlog",
            "createdAt": "2021-01-12T15:53:11.704Z",
            "updatedAt": "2021-01-12T15:53:11.704Z"
        }
    }
]
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### POST /task
---
> Add new task

_Request Headers_
```
{
    access_token : "MOutCvMHysWtpWDi00"
}
```

_Request Body_
```
{
    title: "Belajar Vue",
    CategoryId: 1
}
```

_Response( 200 )_
```
{
    "title": "Belajar React"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### DELETE /task/:idTask
---
> Delete task

_Request Headers_
```
{
    access_token : "MOutCvMHysWtpWDi00"
}
```

_Request Body_
```
Not needed
```

_Response( 200 )_
```
{
    "message": "test is deleted"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```

---
### PUT /task/:idTask/:CategoryId
---
> Add new task

_Request Headers_
```
{
    access_token : "MOutCvMHysWtpWDi00"
}
```

_Request Body_
```
{
    title: "Belajar Vue / React"
}
```

_Response( 200 )_
```
{
    "id": 1,
    "title": "test",
    "UserId": 1,
    "CategoryId": 2
}
```

_Response( 400 - Bad Request )_
```
{
    "message": "title is required"
}
```

_Response( 404 - Not Found )_
```
{
    "message": "Not found"
}
```

_Response ( 500 - Internal Server Error )_
```
{
    "message": "Internal server error"
}
```