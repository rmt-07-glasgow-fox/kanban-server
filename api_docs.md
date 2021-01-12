# Kanban Server
## RESTful endpoints
_Auth Endpoint_

-  `POST /register`
-  `POST /login`
-  `POST /loginGoogle`

**Register**
----
Create new User
*  **URL**  `/register`

*  **Method**  `POST`

* **Request Body**

  ```
  {
    "email": "<user_email>",
    "password": "<user_password>"
  }
  ```

* **Success Response:** <br>
  **Code:** 201 <br>
  **Content:**

  ```
  {
    "message": "Success create user"
  }
  ```

* **Failed Response:** <br>
  **Code:** 400 <br>
  **Content:**

  ```
  [
    {
      message: <error_message>,
      column: <path>
    },
    {
      message: <error_message>,
      column: <path>
    }
  ]
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "message": <error_message>
  }
  ```

**Login**
----
Login User
*  **URL**  `/login`

*  **Method**  `POST`

* **Request Body**

  ```
  {
    "email": "<user_email>",
    "password": "<user_password>"
  }
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    "access_token": <jwt_token>
  }
  ```

* **Failed Response:** <br>
  **Code:** 400 <br>
  **Content:**

  ```
  {
    "message": <error_message>
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "message": <error_message>
  }
  ```
**Login Google**
----
Login with google
*  **URL**  `/loginGoogle`

*  **Method**  `POST`

* **Request Body**

  ```
  {
    "idToken": "<google user token id>"
  }
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    "access_token": <jwt_token>
  }
  ```

* **Failed Response:** <br>
  **Code:** 400 <br>
  **Content:**

  ```
  {
    "message": <error_message>
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "message": <error_message>
  }
  ```
----

_Tasks Endpoint_

-  `GET /tasks`
-  `POST /tasks`
-  `PUT /tasks/:id`
-  `DELETE /tasks/:id`

**Tasks**
----
Get all tasks
*  **URL**  `/tasks`

*  **Method**  `GET`

* **Request Headers**
  ```
    {
      "access_token": "<access_token>"
    }
  ```

* **Request Body**

  ```
  Not needed
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  [
    {
      "id": "<task id>",
      "title": "<task title>",
      "category": "<task category>",
      "UserId": "<task input user>",
      "createdAt": "<task created at>",
      "createdAt": "<task updated at>"
    },
    {
      ...
    }
  ]  
  ```

* **Failed Response:** <br>
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "message": <error_message>
  }
  ```
----
Create new task
*  **URL**  `/tasks`

*  **Method**  `POST`

* **Request Headers**
  ```
    {
      "access_token": "<access_token>"
    }
  ```

* **Request Body**

  ```
  {
    "title": "<task title>",
    "category": "<task category>"
  }
  ```

* **Success Response:** <br>
  **Code:** 201 <br>
  **Content:**

  ```
  [
    {
      "id": "<task id>",
      "title": "<task title>",
      "category": "<task category>",
      "UserId": "<task input user>",
      "createdAt": "<task created at>",
      "createdAt": "<task updated at>"
    }
  ]  
  ```

* **Failed Response:** <br>
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "message": <error_message>
  }
  ```
----
Update task
*  **URL**  `/tasks/:id`

*  **Method**  `PUT`

* **Request Headers**
  ```
    {
      "access_token": "<access_token>"
    }
  ```

* **Request Body**

  ```
  {
    "title": "<task title update value>",
    "category": "<task category update value>"
  }
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    message: "Success update task"
  }
  ```

* **Failed Response:** <br>
  **Code:** 401 <br>
  **Content:**
  ```
  {
    "message": "Unauthorized"
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "message": <error_message>
  }
  ```
----
Delete task
*  **URL**  `/tasks/:id`

*  **Method**  `DELETE`

* **Request Headers**
  ```
    {
      "access_token": "<access_token>"
    }
  ```

* **Request Body**

  ```
  Not needed
  ```

* **Success Response:** <br>
  **Code:** 200 <br>
  **Content:**

  ```
  {
    message: "Success delete task"
  }
  ```

* **Failed Response:** <br>
  **Code:** 401 <br>
  **Content:**
  ```
  {
    "message": "Unauthorized"
  }
  ```
  **Code:** 500 <br>
  **Content:**
  ```
  {
    "message": <error_message>
  }
  ```