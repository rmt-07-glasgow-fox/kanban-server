# API Documentations

## **Create Task**

Create a Task.

- **URL**

  `/tasks`

- **Method:**

  `POST`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Body**

  **Required:**

  - title (string)
  - CategoryId (integer)

  **Example:**

  - application/json
    ```json
    {
      "title": "Task 1",
      "CategoryId": "1"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "title": "Task I",
      "UserId": 13,
      "CategoryId": 1,
      "updatedAt": "2021-01-12T19:55:01.964Z",
      "createdAt": "2021-01-12T19:55:01.964Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Title is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Categery Id is required"
      }
    ]
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Board not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not member"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/tasks/' --header 'Authorization: Bearer <TOKEN_JWT>' --data-urlencode 'title=Task I' --data-urlencode 'CategoryId=1'
    ```

## **List Todos**

Show list tasks by Category.

- **URL**

  `/tasks/category/:idCategory`

- **Method:**

  `GET`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - idCategory (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": 1,
        "title": "Task I",
        "UserId": 13,
        "CategoryId": 1,
        "createdAt": "2021-01-12T19:55:01.964Z",
        "updatedAt": "2021-01-12T19:55:01.964Z"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 404 Not Found <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Board not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not member"
      }
    ]
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request GET 'http://localhost:3000/tasks/category/1' --header 'Authorization: Bearer <JWT_TOKE>'
    ```

## **Update Task**

Update Task.

- **URL**

  `/tasks/:id`

- **Method:**

  `PUT`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Request Body**

  **Required:**

  - title (string)

  **Example:**

  - application/json
    ```json
    {
      "title": "Task 3"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "Task has been updated"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Title is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Board not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not owner task"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "You are not member"
      }
    ]
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request PUT 'http://localhost:3000/tasks/2' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'title=Task II'
    ```

## **Update Categori Id Task**

Update status Task.

- **URL**

  `/tasks/:id/category/:idCategory`

- **Method:**

  `PATCH`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **URL Params**

  - id (integer)
  - idCategory (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "message": "Task has been updated"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Board not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not owner task"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "You are not member"
      }
    ]
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request PATCH 'http://localhost:3000/tasks/2/category/2' --header 'Authorization: Bearer <JWT_TOKEM'
    ```

## **Destroy Task**

Destroy Task.

- **URL**

  `/tasks/:id`

- **Method:**

  `DELETE`

- **Request Header**

  **Required:**

  - Authorization (string)

  **Example:**

  - application/json
    ```json
    {
      "Authorization": "Bearer <JWT_TOKEN>"
    }
    ```

- **Request Params**

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Task has been deleted"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Category not found"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Board not found"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not owner task"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "You are not member"
      }
    ]
    ```

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request DELETE 'http://localhost:3000/tasks/1' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Register**

Register user.

- **URL**

  `/users/register`

- **Method:**

  `POST`

- **Request Body**

  **Required:**

  - first_name (string)
  - last_name (string)
  - email (string)
  - password (string)

  **Example:**

  - application/json
    ```json
    {
      "first_name": "Ari",
      "last_name": "Bambang",
      "email": "ari@mail.com",
      "password": "1234567890"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 1,
      "email": "ari@mail.com"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "First name is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Last name is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Email is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Password is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Password at least 6 characters"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/users/register' --data-urlencode 'first_name=ari' --data-urlencode 'last_name=bambang' --data-urlencode 'email=ari@mail.com' --data-urlencode 'password=1234567890'
    ```

## **Login**

Login user.

- **URL**

  `/users/login`

- **Method:**

  `POST`

- **Request Body**

  **Required:**

  - email (string)
  - password (string)

  **Example:**

  - application/json
    ```json
    {
      "email": "ari@mail.com",
      "password": "1234567890"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "access_token": "<JWT_TOKEN>",
      "first_name": "ari",
      "last_name": "bambang"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Invalid email or password"
      }
    ]
    ```

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/users/login' --data-urlencode 'email=bambang@mail.com' --data-urlencode 'password=1234567890''
    ```

## **Google Login**

Login with Google user.

- **URL**

  `/users/google`

- **Method:**

  `POST`

- **Request Body**

  **Required:**

  - idToken (string)

  **Example:**

  - application/json
    ```json
    {
      "idToken": "<ID_TOKEN>"
    }
    ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "access_token": "<JWT_TOKEN>",
      "first_name": "ari",
      "last_name": "bambang"
    }
    ```

- **Error Response:**

  - **Code:** 500 Internal Server Error <br />
    **Content:**
    ```json
    [
      {
        "message": "internal server error"
      }
    ]
    ```

- **Sample Call:**
  - **curl**:
    ```js
    curl --location --request POST 'http://localhost:3000/users/google' --data-urlencode 'idToken=<ID_TOKEN>'
    ```
