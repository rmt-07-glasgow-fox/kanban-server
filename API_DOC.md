**Kanban App**
----
  Kanban App is an application to manage your task list. this app has:
  - RESTful endpoint for task's CRUD opration
  - JSON formatted response

&nbsp;

# RESTful endpoints
**Register**
----
  create user into server

* **URL**

  /register

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "rafli@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 1,
    "email": "rafli@gmail.com"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "password atleast 6 character",
        "password must be filled"
    ]
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Login**
----
  login into server

* **URL**

  /login

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "email": "rafli@gmail.com",
    "password": "123123123"
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 34,
    "email": "rafli@gmail.com",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzQsImVtYWlsIjoicmFmbGlAZ21haWwuY29tIiwiaWF0IjoxNjEwNzAwMzY2fQ.uuAYqmijdWi8jQOR39Y1wwdtea-LL6HVbBvbfJxVi4o"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "password atleast 6 character",
        "password must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorLogin",
    "message": "wrong email / password"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Create task**
----
  Create task into server

* **URL**

  /tasks

* **Method**

  `POST`

* **Request Body**

  ```
  {
    "title": "Header",
    "category": "backlog"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 201 <br />
  **Content:**
  ```
  {
    "id": 1,
    "title": "Header",
    "category": "backlog",
    "UserId": 1,
    "updatedAt": "2021-01-15T08:50:23.973Z",
    "createdAt": "2021-01-15T08:50:23.973Z"
  }
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "SequelizeValidationError",
    "message": [
        "title must be filled"
    ]
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read task**
----
  Read task from server

* **URL**

  /tasks

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 1,
        "title": "Header",
        "category": "backlog",
        "UserId": 1,
        "createdAt": "2021-01-15T08:50:23.973Z",
        "updatedAt": "2021-01-15T08:50:23.973Z",
        "User": {
            "id": 1,
            "email": "rafli@gmail.com",
            "password": "$2a$10$VAb6zno3rbWKjARwJI8truWeccbHVE2D0fICEnA8oa9T86fw8WnAS",
            "createdAt": "2021-01-15T08:40:49.195Z",
            "updatedAt": "2021-01-15T08:40:49.195Z"
        }
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Read task by id**
----
  Read task from server

* **URL**

  /tasks/:id

* **Method**

  `GET`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "id": 1,
    "title": "Header",
    "category": "backlog",
    "UserId": 34,
    "createdAt": "2021-01-15T08:50:23.973Z",
    "updatedAt": "2021-01-15T08:50:23.973Z",
    "User": {
        "id": 34,
        "email": "rafli@gmail.com",
        "password": "$2a$10$VAb6zno3rbWKjARwJI8truWeccbHVE2D0fICEnA8oa9T86fw8WnAS",
        "createdAt": "2021-01-15T08:40:49.195Z",
        "updatedAt": "2021-01-15T08:40:49.195Z"
    }
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthenticate",
    "message": "you need to login first"
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Edit task**
----

* **URL**

  /tasks/:id

* **Method**

  `PUT`

* **Request Body**

  ```
  {
    "title": "Header",
    "category": "backlog"
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 1,
        "title": "Stralight",
        "category": "backlog",
        "UserId": 34,
        "createdAt": "2021-01-15T08:50:23.973Z",
        "updatedAt": "2021-01-15T09:01:21.469Z"
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Edit Status task**
----

* **URL**

  /tasks/:id

* **Method**

  `PATCH`

* **Request Body**

  ```
  {
    "category": todo
  }
  ```

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  [
    {
        "id": 1,
        "title": "Stralight",
        "category": "todo",
        "UserId": 34,
        "createdAt": "2021-01-15T08:50:23.973Z",
        "updatedAt": "2021-01-15T09:02:25.165Z"
    }
  ]
  ```

* **Failed Response:** <br />
  **Code:** 400 <br />
  **Content:**
  ```
  {
    <validation message>
  }
  ```
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

**Delete task**
----

* **URL**

  /tasks/:id

* **Method**

  `DELETE`

* **Request Headers**

  ```
  {
    access_token : <your access_token>
  }
  ```

* **Success Response:** <br />
  **Code:** 200 <br />
  **Content:**
  ```
  {
    "message": "task deleted successfull"
  }
  ```

* **Failed Response:** <br />
  **Code:** 401 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorAuthorize",
    "message": "you dont have access"
  }
  ```
  **Code:** 404 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "name": "ErrorNotFound",
    "message": "not found"
  }
  ```
  **Code:** 500 <br />
  **Content:**
  ```
  {
    "status": "Error",
    "error": <internal server error>
  }
  ```

