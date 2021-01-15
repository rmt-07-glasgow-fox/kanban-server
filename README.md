# KANBAN-SERVER

```
Let's you visualize, organize, and manage your workflow in the best possible way.
```

&nbsp;

#
## Endpoints

- `POST /login`
- `POST /register`
- `POST /loginGoogle`
- `POST /tasks`
- `GET /tasks`
- `PUT /tasks/:id`
- `DELETE /tasks/:id`

&nbsp;

## Restful endpoints
#
## URL
```
Client URL : 
Server URL : https://kanban-gg.herokuapp.com/
```

### GET/login
>login

_Request Header_
```
none
```
_Request Body_
```
email : <your registered mail>
password : <your password>
```
_Response(200)_
```
{
  access_token : "token string"
}
```
_Response(400)_
```
{
  message : 'invalid'
}
```
_Response(500)_
```
{
  access_token : "internal server error"
}
```
### GET/register
>register

_Request Header_
```
none
```
_Request Body_
```
fullName : <your fullName>
email : <your email>
password : <your password>
```
_Response(201)_
```
{
  id: 1,
  email : name@mail.com
}
```
_Response(400)_
```
{
  [
    {
        "message": "must be a valid email address"
    },
    {
        "message": "can not be empty"
    }
  ]
}
```
_Response(500)_
```
{
  access_token : "internal server error"
}
```

### POST /tasks
>create a task

_Request Header_
```
access_token
```
_Request Body_
```
title : mulai coding
category : backlog
```
_Response(201)_
```
{
  "createdTask": {
      "id": 3,
      "title": "mulai coding",
      "category": "backlog",
      "UserId": 4,
      "updatedAt": "2021-01-13T23:16:49.584Z",
      "createdAt": "2021-01-13T23:16:49.584Z"
  }
}
```
_Response(400)_
```
[
  {
      "message": "can not be empty"
  },
  {
      "message": "can not be empty"
  }
]
```
_Response(401)_
```
{
    "message": "please login"
}
```
_Response(500)_
```
{
  access_token : "internal server error"
}
```

### GET /tasks
>fetch all task

_Request Header_
```
access_token
```
_Request Body_
```
none
```
_Response(200)_
```
[
    {
      "id": 3,
      "title": "lanjut coding",
      "category": "backlog",
      "createdAt": "2021-01-14T19:25:28.154Z",
      "updatedAt": "2021-01-14T19:25:28.154Z",
      "UserId": 4
    },
    ...
]
```
_Response(500)_
```
{
  access_token : "internal server error"
}
```

### PUT /tasks/id
>edit task

_Request Header_
```
access_token
```
_Request Params_
```
id
```
_Request Body_
```
title : clanjut coding lagi
category : To do
```
_Response(200)_
```
{
  "id": 3,
  "title": "lanjut coding lagi",
  "category": "To do",
  "createdAt": "2021-01-14T19:50:15.514Z",
  "updatedAt": "2021-01-14T20:11:50.892Z",
  "UserId": 4
}
```
_Response(400)_
```
[
    {
        "message": "can not be empty"
    },
    {
        "message": "can not be empty"
    }
]
```
_Response(500)_
```
{
  access_token : "internal server error"
}
```

### DELETE /tasks/id
>fdelete a task

_Request Header_
```
access_token
```
_Request Params_
```
id
```
_Request Body_
```
none
```
_Response(200)_
```
{
  "message": "succesfully delete a task"
}
```
_Response(500)_
```
{
  access_token : "internal server error"
}
```
### GET/googleLogin
>login

_Request Header_
```
none
```
_Request Body_
```
token
```
_Response(200)_
```
{
  access_token : "token string"
}
```
_Response(500)_
```
{
  access_token : "internal server error"
}
```