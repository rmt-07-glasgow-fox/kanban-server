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