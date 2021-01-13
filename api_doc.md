# Kanban REST APIs Documentation

## Open Endpoints

Open endpoints require no Authentification.

* [Register](regiser.md) : `POST  /api/users/register/`
* [Login](login.md) : `POST /api/users/login/`

## Endpoints that require Authentification

Closed endpoints require a Valid Token to be included in the header of the request. A Token can be acquired from the Login view above.

### Authentification Example

`in header request put:`

```json
{
  "access_token": "2jh3kjdbkqjh2kj3hkjncd23bnkd3981ndjka89h32jkkjnasdl"
}
```

### Error Response for Authentification Endpoints

**Condition** : If not provide valid `access_token` on header while request

**Code** : `400 BAD REQUEST`

**Content** :

```json
{
  "message": "Login First"
}
```

## Task Related

* [Create Task](createTask.md) : `POST /api/tasks/`
* [Show Tasks](showTasks.md) : `GET /api/tasks/`
* [Show a Taks](showTask.md) : `GET /api/tasks/:id/`
* [Update a Task](updateTask.md) : `PUT /api/tasks/:id/`
* [Update a Task Category](updataTaskCategory.md) : `PATCH /api/tasks/:id/`
* [Delete a Task](deleteTask.md) : `DELETE /api/tasks/:id/`

## Error Response because Server Error

**Condition** : Internal Server Error

**Code** : `500 INTERNAL SERVER ERROR`

**Content** :

```json
{
  "message": "INTERNAL SERVER ERROR"
}
```

# Register

Create an Acount for Authenticated User if an Account for that User does not already exist. Each User can only have one Account.

**URL** : `/api/users/register/`

**Method** : `POST`

**Auth required** : `None`

**Permission required** : `None`

**Data constraints** :

Provide email dan password of an Account to be created.

```json
{
  "email": "[valid email address; unique email]",
  "password": "[password in plain text; at least 6 characters]"
}
```

**Data example** All fields must be sent

```json
{
  "email": "andrianm28@hacktiv8.com",
  "password": "lolipop28"
}
```

## Success Response

**Condition** : If everything is Oke and an Account didn't exist for this User.

**Code** : `201 CREATED`

**Content example** :

```json
{
  "id": "1",
  "email": "andrianm28@hacktiv8.com"
}
```

## Error Response

**Condition** : If Account already exist.

**Code** : `303 SEE OTHER`

**Headers** : `Location: /api/api/users/1/`

**Content example** :

```json
{
  "message": "This email is already exist"
}
```

### Or

**Condition** : If email field is missed.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Email is Required"
}
```

### Or

**Condition** : If email field not filled with valid email address.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Email must be valid email address"
}
```

### Or

**Condition** : If password field is missed.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Password is Required"
}
```

### Or

**Condition** : If passord length less than 6 characthers.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Password at least 6 characters"
}
```

# Login

Used to collect a Token for registered User.

**URL** : `/api/users/login/`

**Method** : `POST`

**Auth required** : `None`

**Permission required** : `None`

**Data constraints** :

```json
{
  "email": "[valid email address; unique email]",
  "password": "[password in plain text; at least 6 characters]"
}
```

**Data example** All fields must be sent

```json
{
  "email": "andrianm28@hacktiv8.com",
  "password": "lolipop28"
}
```

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
  "access_token": "2jh3kjdbkqjh2kj3hkjncd23bnkd3981ndjka89h32jkkjnasdl"
}
```

## Error Response

**Condition** : If Account does not exist.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Email does not exist"
}
```

### Or

**Condition** : If email field is missed.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Email is Required"
}
```

### Or

**Condition** : If email field not filled with valid email address.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Email must be valid email address"
}
```

### Or

**Condition** : If password is  wrong.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Wrong Password"
}
```

### Or

**Condition** : If password field is missed.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Password is Required"
}
```

### Or

**Condition** : If passord length less than 6 characthers.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Password at least 6 characters"
}
```

# Create a Task

**URL** : `/api/tasks/`

**Method** : `POST`

**Auth required** : `YES`

**Permission required** : `None`

**Data constraints** :

```json
{
  "title": "[string]"
}
```

**Data example** All fields must be sent

```json
{
  "title": "Write APIs Documentation"
}
```

## Success Response

**Code** : `201 CREATED`

**Content example** :

```json
{
  "id": "1",
  "title": "Write APIs Documentation",
  "category": "backlog",
  "updatedAt": "2021-01-13 09:00:32.958+07",
  "createdAt": "2021-01-13 09:00:32.958+07"   
}
```

## Error Response

**Condition** : If title field is missed.

**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Title is Required"
}
```

# Show Tasks

**URL** : `/api/tasks/`

**Method** : `GET`

**Auth required** : `YES`

**Permission required** : `None`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
[
  {
    "id": "1",
    "title": "Write APIs Documentation",
    "category": "backlog",
    "updatedAt": "2021-01-13 09:00:32.958+07",
    "createdAt": "2021-01-13 09:00:32.958+07"    
  }
]
```

# Show a Task

**URL** : `/api/tasks/:id`

**Method** : `GET`

**Auth required** : `YES`

**Permission required** : `None`

## Success Response

**Code** : `200 OK`

**Content example** :

```json
{
  "id": "1",
  "title": "Write APIs Documentation",
  "category": "backlog",
  "updatedAt": "2021-01-13 09:00:32.958+07",
  "createdAt": "2021-01-13 09:00:32.958+07"    
}
```

# Update a Task

**URL** : `/api/tasks/:id`

**Method** : `PUT`

**Auth required** : `YES`

**Permission required** : `User is Task Owner`

**Data constraint** :

```json
{
  "title": "[string]",
  "category": "[string]"
}
```

**Data example** Partial data is allowed.

```json
{
  "title": "Learn FrontEnd",
  "category": "todo"
}
```

## Success Response

**Condition** : Update can be performed either fully or partially by the Owner of the task.

**Code** : `200 OK`

**Content example** : For the example above, when the `title` and `category` is updated and posted to `/api/tasks/1` ...

```json
{
  "id": "1",
  "title": "Learn FrontEnd",
  "category": "todo",
  "updatedAt": "2021-01-13 09:00:32.958+07",
  "createdAt": "2021-01-13 09:00:32.958+07"    
}
```

## Error Response

**Condition** : Task does not exist.
**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Task does not exist"
}
```

### Or

**Condition** : Authorized User is not the Owner of the Task at URL.

**Code** : `403  FORBIDDEN`

**Content example** :

```json
{
  "message": "Unauthorized"
}
```

# Update a Task Category

**URL** : `/api/tasks/:id`

**Method** : `PATCH`

**Auth required** : `YES`

**Permission required** : `User is Task Owner`

## Success Response

**Condition** : If everything is OK

**Code** : `200 OK`

**Content example** : For the example above, when update `catogery` from 'todo' to 'doing' patched to  `/api/tasks/1` ...

```json
{
  "id": "1",
  "title": "Learn FrontEnd",
  "category": "doing",
  "updatedAt": "2021-01-13 09:00:32.958+07",
  "createdAt": "2021-01-13 09:00:32.958+07"    
}
```

## Error Response

**Condition** : Task does not exist.
**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Task does not exist"
}
```

### Or

**Condition** : Authorized User is not the Owner of the Task at URL.

**Code** : `403  FORBIDDEN`

**Content example** :

```json
{
  "message": "Unauthorized"
}
```

# Delete a Task

**URL** : `/api/tasks/:id`

**Method** : `DELETE`

**Auth required** : `YES`

**Permission required** : `User is Task Owner`

## Success Response

**Condition** : If everything is OK

**Code** : `200 OK`

**Content example** : For the example above, when update `catogery` from 'todo' to 'doing' patched to  `/api/tasks/1` ...

```json
{
  "message": "task with title '<title>' sucess to delete"
}
```

### Or

**Condition** : Task does not exist.
**Code** : `400 BAD REQUEST`

**Content example** :

```json
{
  "message": "Task does not exist"
}
```

### Or

**Condition** : Authorized User is not the Owner of the Task at URL.

**Code** : `403  FORBIDDEN`

**Content example** :

```json
{
  "message": "Unauthorized"
}
```
