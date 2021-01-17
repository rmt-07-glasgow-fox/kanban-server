# kanban-server


**How to**
---
```
Deployed link : https://kanban-server-by-rozakus.herokuapp.com
```

```
settings server : 

npm i
sequelize db:create
sequelize db:migrate

run server : npm run dev
server url : http://localhost:3000
```


**User**
| Method | Route             | Description                            |
| ------ | ----------------- | -------------------------------------- |
| POST   | /user/register    | Add new user                           |
| POST   | /user/login       | Login user                             |
| POST   | /user/loginGoogle | Login/Register user using google oauth |

**Task**
| Method | Route                     | Description          |
| ------ | ------------------------- | -------------------- |
| GET    | /task                     | Get list Task        |
| POST   | /task                     | Add task             |
| DELETE | /task/:idTask             | Delete task          |
| PATCH  | /task/:idTask/:idCategory | Change category task |
| PUT    | /task/:idTask/:idCategory | Edit task            |

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
    "access_token": "eyJhbdderscgeygr",
    "email" : 'user@gmail.com'
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
                "id": 30,
                "title": "fdfdfdf",
                "UserId": 1,
                "CategoryId": 1,
                "User": {
                    "id": 1,
                    "email": "user01@gmail.com"
                }
            }
        ]
    },
    {
        "id": 2,
        "category": "todo",
        "Tasks": [
            {
                "id": 14,
                "title": "test ganti dong",
                "UserId": 2,
                "CategoryId": 2,
                "User": {
                    "id": 2,
                    "email": "user02@gmail.com"
                }
            },
            {
                "id": 13,
                "title": "test ganti dong",
                "UserId": 2,
                "CategoryId": 2,
                "User": {
                    "id": 2,
                    "email": "user02@gmail.com"
                }
            }
        ]
    },
    {
        "id": 3,
        "category": "doing",
        "Tasks": [
            {
                "id": 12,
                "title": "Belajar Vue 1",
                "UserId": 2,
                "CategoryId": 3,
                "User": {
                    "id": 2,
                    "email": "user02@gmail.com"
                }
            },
            {
                "id": 31,
                "title": "fdfdfdf",
                "UserId": 12,
                "CategoryId": 3,
                "User": {
                    "id": 12,
                    "email": "abdulrozak.mail@gmail.com"
                }
            }
        ]
    },
    {
        "id": 4,
        "category": "done",
        "Tasks": [
            {
                "id": 26,
                "title": "rozak",
                "UserId": 11,
                "CategoryId": 4,
                "User": {
                    "id": 11,
                    "email": "user05@gmail.com"
                }
            },
            {
                "id": 16,
                "title": "hg",
                "UserId": 1,
                "CategoryId": 4,
                "User": {
                    "id": 1,
                    "email": "user01@gmail.com"
                }
            }
        ]
    }
]
```

_Response( 401 - Unauthorized )_
```
{
    "message": "Unauthorized / access_token is required"
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

_Response( 401 - Unauthorized )_
```
{
    "message": "Unauthorized / access_token is required"
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
_Response( 401 - Unauthorized )_
```
{
    "message": "Unauthorized / access_token is required"
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

_Response( 401 - Unauthorized )_
```
{
    "message": "Unauthorized / access_token is required"
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

_Response( 401 - Unauthorized )_
```
{
    "message": "Unauthorized / access_token is required"
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

_Response( 401 - Unauthorized )_
```
{
    "message": "Unauthorized / access_token is required"
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