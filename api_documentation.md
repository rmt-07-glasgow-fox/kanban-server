# Kanban App Server
Kanban App is an application to manage your kanban. This app has : 
* RESTful endpoint for authtentication operation
* RESTful endpoint for organisation's CRUD operation
* RESTful endpoint for task's CRUD operation
* JSON formatted response

&nbsp;

## RESTful endpoints

_Auth Endpoint_
- `POST /login`
- `POST /register`

_Tasks Endpoint_
- `GET /task`
- `GET /task/:id`
- `POST /task`
- `PUT /task/:id`
- `PATCH /task/:id`
- `DELETE /task/:id`

_Organisation Endpoint_
- `GET /organisations`
- `GET /organisations/:id`
- `POST /organisations`
- `PUT /organisations/:id`
- `DELETE /organisations/:id`


### POST /login

> login to app

_Request Header_
```
{
  not needed
}
```

_Request Body_
```json
{
  "email": "<email to get login>",
  "password": "<password to get login>",
}
```

_Response (200)_
```json
{
"status" : "success",
"data" : {
  "email": "<login email>",
  "password": "<login password>",
}
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": 
    "invalid email or password"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---

### POST /register

> Register new user

_Request Header_
```
{
  not needed
}
```

_Request Body_
```json
{
  "email": "<email to get register>",
  "password": "<password to get register>",
  "firstName": "<first name to get register>",
  "lastName": "<last name to get register>"
}
```

_Response (200)_
```json
{
"status" : "success",
"data" : {
  "email": "<posted email>",
  "password": "<posted password>",
  "firstName": "<posted first name>",
  "lastName": "<posted last name>"
}
}
```

_Response (400 - Bad Request)_
```json
{
  "status": "error",
  "message": [
        "email must be unique"
        "invalid email",
        "field email is required",
        "field password is required",
        "password must at least 6 character",
        "field first name is required",
        "field last name is required"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---

### GET /tasks

> Get all tasks

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
{
  "status" : "success",
  "data" : 
    [
        {
            "id": 1,
            "name": "<tasks name>",
            "description": "<tasks description>",
            "userId": "<tasks user id>",
            "organisationId": "<tasks organisation id>",
            "categoryId": "<tasks category id>",
            "createdAt": "2021-01-12T13:06:12.450Z",
            "updatedAt": "2021-01-12T13:06:12.450Z",
            "organisation": {
                "name": "black fox"
            },
            "category": {
                "name": "backlog"
            },
            "user": {
                "firstName": "Mochammad",
                "lastName": "Trinanda",
                "email": "m.trinandanoviardy@gmail.com"
            }
        },
        {
            "id": 2,
            "name": "<tasks name>",
            "description": "<tasks description>",
            "userId": "<tasks user id>",
            "organisationId": "<tasks organisation id>",
            "categoryId": "<tasks category id>",
            "createdAt": "2021-01-12T13:06:12.450Z",
            "updatedAt": "2021-01-12T13:06:12.450Z",
            "organisation": {
                "name": "vintage fox"
            },
            "category": {
                "name": "todo"
            },
            "user": {
                "firstName": "Mochammad",
                "lastName": "Trinanda",
                "email": "m.trinandanoviardy@gmail.com"
            }
        }
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### GET /tasks/:id

> Get a task

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
{
  "status" : "success",
   "data": {
            "id": 2,
            "name": "<tasks name>",
            "description": "<tasks description>",
            "userId": "<tasks user id>",
            "organisationId": "<tasks organisation id>",
            "categoryId": "<tasks category id>",
            "organisation": {
                "name": "vintage fox"
            },
            "category": {
                "name": "todo"
            },
            "user": {
                "firstName": "Mochammad",
                "lastName": "Trinanda",
                "email": "m.trinandanoviardy@gmail.com"
            }
        }
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### POST /tasks

> Create new task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "description": "<description to get insert into>"
}
```

_Response (201 - Created)_
```json
{
"status" : "success",
"data" : {
  "id": "<given id by system>",
  "name": "<posted name>",
  "description": "<posted description>",
  "organisationId": "<posted organisation id>",
  "categoryId": "<posted category id>",
  "userId": "<posted user id>",
  "updatedAt": "2021-01-13T00:55:09.093Z",
  "createdAt": "2021-01-13T00:55:09.093Z",
}
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "name is required",
        "description is required",
        "organisation is required",
        "category is required",
        "user is required",
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### PUT /tasks/:id

> Update tasks

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get update into>",
  "description": "<description to get update into>"
}
```

_Response (200)_
```json
{
    "status" : "success",
    "data" : {
        "id": "<id tasks>",
        "name": "<updated name>",
        "description": "<updated description>",
        "categoryId": "<updated category id>",
        "updatedAt": "2021-01-13T00:55:09.093Z",
        "createdAt": "2021-01-13T00:55:09.093Z",
        }
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "title is required",
        "description is required"
    ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### PATCH /tasks/:id

> Update category task

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "categoryId": "<category id to get update into>",
}
```

_Response (200)_
```json
{
  "status": "success",
  "data" : {
    "categoryId": "<updated categoryId>",
  }
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "category id is required",
    ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

---
### DELETE /tasks/:id

> Delete task

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
{
  "status": "success",
  "message": "task successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```

### GET /organisations

> Get all organisations

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
{
  "status" : "success",
  "data": [
        {
            "id": 1,
            "email": "<user email>",
            "organisation": [
            {
                "name": "<organisation name>",
                "owner": {
                    "firstName": "<owner firstname>",
                    "lastName": "owner lastname"
                },
                "UserOrganisation": {
                    "userId": "<user organisation user id>",
                    "organisationId": "<user organisation organisation id>",
                    "createdAt": "2021-01-12T13:06:12.450Z",
                    "updatedAt": "2021-01-12T13:06:12.450Z"
                }
            }
            ]
        },
        {
            "id": 2,
            "email": "<user email>",
            "organisation": [
            {
                "name": "<organisation name>",
                "owner": {
                    "firstName": "<owner firstname>",
                    "lastName": "<owner lastname>"
                },
                "UserOrganisation": {
                    "userId": "<user organisation user id>",
                    "organisationId": "<user organisation organisation id>",
                    "createdAt": "2021-01-12T13:06:12.450Z",
                    "updatedAt": "2021-01-12T13:06:12.450Z"
                }
            }
            ]
        },
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### GET /organisation/:id

> Get a organisation

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
{
  "status" : "success",
   "data": {
        "id": "<organisation id>",
        "name": "<organisation name>",
        "task": [
            {
                "id": "<task id>",
                "name": "<task name>",
                "description": "<task description>",
                "createdAt": "2021-01-12T13:06:12.450Z",
                "updatedAt": "2021-01-12T13:06:12.450Z",
                "user": {
                    "email": "<user email>"
                },
                "category": {
                    "name": "<category name>"
                }
            },
   }
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "organisation not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### POST /organisation

> Create new organisation

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get insert into>",
  "ownerId": "<owner id to get insert into>",

}
```

_Response (201 - Created)_
```json
{
"status" : "success",
"data" : {
  "id": "<given id by system>",
  "name": "<posted name>",
  "ownerId": "<posted owner id >",
  "createdAt": "2020-03-20T07:15:12.149Z",
  "updatedAt": "2020-03-20T07:15:12.149Z",
}
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "title is required",
        "owner is required"
    ]
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### PUT /organisation/:id

> Update organisation 

_Request Header_
```json
{
  "access_token": "<your access token>"
}
```

_Request Body_
```json
{
  "name": "<name to get update into>",
}
```

_Response (200)_
```json
{
    "status" : "success",
    "data" : {
      "name": "<updated name>",
      "createdAt": "2020-03-20T07:15:12.149Z",
      "updatedAt": "2020-03-20T07:15:12.149Z",
    }
}
```

_Response (400 - Bad Request)_
```json
{
  "status" : "error",
  "message": [
        "name is required",
    ]
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```
---
### DELETE /organisation/:id

> Delete organisation

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
{
  "status": "success",
  "message": "organisation successfully deleted",
}
```

_Response (401 - Unauthorized)_
```json
{
  "status" : "error",
  "message": "unauthorized!"
}
```

_Response (404 - Not Found)_
```json
{
  "status" : "error",
  "message": "organisation not found"
}
```

_Response (500 - Internal Server Error)_
```json
{
  "status" : "error",
  "message": "Internal server error"
}
```