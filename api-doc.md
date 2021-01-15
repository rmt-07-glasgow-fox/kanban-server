# Kanban-Apps

---

# API-Documentation with Markdown

## POST /users/register

_Request Body_

```
{
    (REQUIRED) "email": "test@mail.com",
    (REQUIRED) "password": "test"
}
```

_Response (201 - Created)_

```
{
    "id": 1,
    "email": "test@mail.com"
}
```

_Response (400 - Bad Request - Email must unique)_

```
{
    "message": "must provide email and password"
}
```

_Response (400 - Bad Request - Email & Password cannot be empty)_

```
{
    "message": [
      "email is required",
      "password is required"
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /users/login

_Request Body_

```
{,
    (REQUIRED) "email": "test@mail.com",
    (REQUIRED) "password": "test"
}
```

_Response (200 - Ok)_

```
{
    "access_token": "/token from login/"
}
```

_Response (400 - Invalid Account or Password)_

```
{
    "message": "must provide email and password"
}
```

_Response (400 - Email or Password cannot be empty)_

```
{
    "message": "Email or Password Cannot be Empty"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /users/loginGoogle

_Request Body_

```
{,
    (REQUIRED) "googleToken": "/Token from Google/"
}
```

_Response (200 - Ok)_

```
{
    "access_token": "/token from login/"
}
```

_Response (401 - No Google Token)_

```
{
    "message": "Unauthorized User - No Google Token"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## POST /tasks

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Request Body_

```
{
    (REQUIRED) "title": "Contoh Judul",
}
```

_Response (201 - Created)_

```
{
    "id": 1,
    "title": "Contoh Judul",
    "UserId": 1,
    "updatedAt": "2020-12-01T09:19:36.583Z",
    "createdAt": "2020-12-01T09:19:36.583Z",
    "CategoryId": "1"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
      "title is required",
    ]
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "you must be logged in"
}
```

_Response (404 - Not Found - Invalid Access Token)_

```
{
    "message": "Invalid Email Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## GET /tasks

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
[
  {
    "id": 1,
    "title": "Ganti Judul",
    "Category": 2,
    "UserId": 1,
    "createdAt": "2020-11-30T14:05:36.610Z",
    "updatedAt": "2020-12-01T09:10:38.915Z"
  },
  {
    "id": 3,
    "title": "Judul 2",
    "CategoryId": 2,
    "UserId": 2,
    "createdAt": "2020-12-01T09:19:36.583Z",
    "updatedAt": "2020-12-01T09:19:36.583Z"
  },
  {
    "id": 3,
    "title": "Judul 2",
    "CategoryId": 2,
    "UserId": 2,
    "createdAt": "2020-12-01T09:19:51.774Z",
    "updatedAt": "2020-12-01T09:19:51.774Z"
  }
]
```

_Response (401 - No Access Token)_

```
{
    "message": "you must be logged in"
}
```

_Response (404 - Invalid Access Token)_

```
{
    "message": "Invalid email or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## GET /categories

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
[
    {
        "id": 1,
        "name": "Back-log",
        "Tasks": [
            {
                "id": 11,
                "title": "test",
                "createdAt": "2020-12-04T06:56:37.133Z",
            }
        ]
    },
    {
        "id": 2,
        "name": "Todo",
        "Tasks": [
            {
                "id": 15,
                "title": "test",
                "createdAt": "2020-12-04T07:39:22.042Z",
            },
            {
                "id": 12,
                "title": "test",
                "createdAt": "2020-12-04T07:20:22.245Z",
            }
        ]
    },
    {
        "id": 3,
        "name": "Ongoing",
        "Tasks": [
            {
                "id": 16,
                "title": "Test sedikit panjang nih",
                "createdAt": "2020-12-04T07:41:00.910Z",
            },
            {
                "id": 14,
                "title": "test",
                "createdAt": "2020-12-04T07:35:12.988Z",
            }
        ]
    },
    {
        "id": 4,
        "name": "Done",
        "Tasks": [
            {
                "id": 17,
                "title": "(Example) Judul 2",
                "createdAt": "2020-12-04T08:00:24.510Z",
            },
            {
                "id": 8,
                "title": "test",
                "createdAt": "2020-12-04T06:25:29.130Z",
            }
        ]
    }
]
```

_Response (401 - No Access Token)_

```
{
    "message": "you must be logged in"
}
```

_Response (404 - Invalid Access Token)_

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

## PUT /tasks/:id

_Request Headers_

```
{
    (REQUIRED) "access_token": "/token from login/"
}
```

_Request Body_

```
{
    (REQUIRED) "title": "Ganti Judul",
    (REQUIRED) "CategoryId": "4"
}
```

_Response (200 - Ok)_

```
{
    "id": 1,
    "title": "Ganti Judul",
    "CategoryId": "4",
    "UserId": 1,
    "createdAt": "2020-11-30T14:05:36.610Z",
    "updatedAt": "2020-12-03T04:40:17.648Z"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "not authorize"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "you must be logged in"
}
```

_Response (404 - Task Not Found)_

```
{
    "message": "Task Not Found"
}
```

_Response (404 - Invalid Access Token)_

```
{
    "message": "Invalid Email or Password"
}
```

_Response (400 - Bad Request)_

```
{
    "message": [
      "Title is required",
    ]
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```

---

## DELETE /tasks/:id

_Request Headers_

```
{,
    (REQUIRED) "access_token": "/token from login/"
}
```

_Response (200 - Ok)_

```
{
    "message": "Task has been deleted"
}
```

_Response (404 - Task Not Found)_

```
{
    "message": "Task Not Found"
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "not authorize"
}
```

_Response (401 - Unauthorized - No Access Token)_

```
{
    "message": "you must be logged in"
}
```

_Response (404 - Invalid Access Token)_

```
{
    "message": "Invalid email Or Password"
}
```

_Response (500 - Internal Server Error)_

```
{
    "message": "Internal Server Error"
}
```
