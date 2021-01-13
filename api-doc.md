# Kanban
Kanban App is an application to manage your task.
* RESTful endpoint for task's CRUD operation
* JSON formatted response

---

>List of available endpoints:
​
- `POST /register`
- `POST /login`
- `GET /tasks`
- `POST /tasks`
- `GET /tasks/:id`
- `PUT /tasks/:id`
- `PATCH /tasks/:id`
- `DELETE /tasks/:id`
---
## POST /register

>Register user

_Request Body :_

```json
{
  "email": "string",
  "password": "string",
  "name": "name"
}
```

_Response (201)_
  ​
```json
{
  "id": "integer",
  "email": "string",
  "name": "string"
}
```
---
## POST /login

>user login

_Request Body:_

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200)_

```json
{
    "access_token": "<your access token>"
}
```
---
## GET /tasks

>get all task

_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body :_

```
not needed
```

_Response (200)_

```json
{

  "id": "<id>",
  "title": "<title>",
  "detail": "<description>",
  "category": "<status>",
  "UserId": "<UserId>",
  "createdAt": "<createdAt>",
  "updatedAt": "<updatedAt>"

}
```
---
## POST /tasks

>add task

_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body :_

```json
{

  "title": "<title>",
  "detail": "<description>",
  "assign": "<assign>",
  "UserId": "<UserId>"

}
```

_Response (200)_

```json
{

  "id": "<id>",
  "title": "<title>",
  "detail": "<description>",
  "category": "backlog",
  "UserId": "<UserId>",
  "createdAt": "<createdAt>",
  "updatedAt": "<updatedAt>"

}
```
---
## DELETE /tasks/:id

>delete task

_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```

_Response (200)_

```
no response
```
---
## GET /tasks/:id

>get all to-do list by task id

_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```

_Response (200)_

```json
{

  "id": "<id>",
  "title": "<title>",
  "detail": "<description>",
  "category": "<category>",
  "UserId": "<UserId>",
  "createdAt": "<createdAt>",
  "updatedAt": "<updatedAt>"

}
```
---
## PUT /tasks/:id

>edit task

_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body :_

```json
{

  "title": "<title>",
  "detail": "<description>",
  "category": "<category>"

}
```

_Response (200)_

```json
{

  "id": "<id>",
  "title": "<title>",
  "detail": "<description>",
  "category": "<category>",
  "UserId": "<UserId>",
  "createdAt": "<createdAt>",
  "updatedAt": "<updatedAt>"

}
```
---
## PATCH /tasks/:id

>update task status

_Request Header :_

```json
{
  "access_token": "<your access token>"
}
```

_Request Body :_

```json
{

  "category": "<category>"

}
```

_Response (200)_

```json
{

  "id": "<id>",
  "category": "<category>"

}
```