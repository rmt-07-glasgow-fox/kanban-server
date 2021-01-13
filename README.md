# kanban-server

**User**
| Method | Route             | Description                            |
| ------ | ----------------- | -------------------------------------- |
| POST   | /user/register    | Add new user                           |
| POST   | /user/login       | Login user                             |
| POST   | /user/loginGoogle | Login/Register user using google oauth |

**Task**
| Method | Route                     | Description   |
| ------ | ------------------------- | ------------- |
| GET    | /task                     | Get list Task |
| POST   | /task                     | Add task      |
| DELETE | /task/:idTask             | Delete task   |
| PUT    | /task/:idTask/:idCategory | Update task   |

**Category**
| Method | Route     | Description        |
| ------ | --------- | ------------------ |
| GET    | /category | Get all categories |
| POST   | /category | Add new category   |

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
        "category": "backlog",
        "Tasks": [
            {
                "id": 4,
                "title": "Belajar React",
                "UserId": 1,
                "CategoryId": 1,
                "createdAt": "2021-01-12T17:13:39.512Z",
                "updatedAt": "2021-01-12T17:13:39.512Z"
            }
        ]
    },
    {
        "id": 2,
        "category": "todo",
        "Tasks": [
            {
                "id": 3,
                "title": "test ganti dong",
                "UserId": 1,
                "CategoryId": 2,
                "createdAt": "2021-01-12T17:12:10.657Z",
                "updatedAt": "2021-01-12T19:56:25.138Z"
            }
        ]
    },
    {
        "id": 3,
        "category": "doing",
        "Tasks": []
    },
    {
        "id": 4,
        "category": "done",
        "Tasks": []
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

---
### GET /category
---
> Get category list

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
        "category": "backlog"
    },
    {
        "id": 2,
        "category": "todo"
    },
    {
        "id": 3,
        "category": "doing"
    },
    {
        "id": 4,
        "category": "done"
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
### POST /category
---
> Get category list

_Request Headers_
```
{
    access_token : "MOutCvMHysWtpWDi00"
}
```

_Request Body_
```
{
    category : "New category"
}
```

_Response( 201 )_
```
{
    message : "New category is created"
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