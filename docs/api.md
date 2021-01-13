# API Documentations

# Task

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

## **List Tasks**

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
    curl --location --request DELETE 'http://localhost:3000/tasks/1' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

# Category

## **Create Category**

Create a Category.

- **URL**

  `/categories`

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

  - name (string)
  - BoardId (integer)

  **Example:**

  - application/json
    ```json
    {
      "name": "Notes",
      "CategoryId": "8"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 6,
      "name": "Notes",
      "BoardId": 8,
      "updatedAt": "2021-01-13T05:49:42.087Z",
      "createdAt": "2021-01-13T05:49:42.087Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Name is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Board Id is required"
      }
    ]
    ```

  - **Code:** 404 Not Found <br />
    **Content:**

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
        "message": "You are not Admin"
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
    curl --location --request POST 'http://localhost:3000/categories/' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'name=Notes' --data-urlencode 'BoardId=8'
    ```

## **List Categories**

Show list categories by Board.

- **URL**

  `/tasks/category/:idBoard`

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

  - idBoard (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": 6,
        "name": "Notes",
        "BoardId": 8,
        "createdAt": "2021-01-13T05:49:42.087Z",
        "updatedAt": "2021-01-13T05:49:42.087Z"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 404 Not Found <br />
    **Content:**

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
    curl --location --request GET 'http://localhost:3000/categories/board/8' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Destroy Category**

Destroy Category.

- **URL**

  `/categories/:id`

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
      "message": "Category has been deleted"
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
        "message": "You are not Admin"
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
    curl --location --request DELETE 'http://localhost:3000/categories/6' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

# Board

## **Create Board**

Create a Board.

- **URL**

  `/boards`

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

  - name (string)
  - Organization (integer)

  **Example:**

  - application/json
    ```json
    {
      "name": "Board 2",
      "Organization": "5"
    }
    ```

- **Success Response:**

  - **Code:** 201 <br />
    **Content:**
    ```json
    {
      "id": 9,
      "name": "Board 2",
      "OrganizationId": 5,
      "updatedAt": "2021-01-13T06:04:11.210Z",
      "createdAt": "2021-01-13T06:04:11.210Z"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

    ```json
    [
      {
        "message": "Name is required"
      }
    ]
    ```

    Or

    ```json
    [
      {
        "message": "Organization Id is required"
      }
    ]
    ```

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not Admin"
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
    curl --location --request POST 'http://localhost:3000/boards' --header 'Authorization: Bearer <JWT_TOKEN>' --data-urlencode 'name=Board 2' --data-urlencode 'OrganizationId=5'
    ```

## **List Boards**

Show list Boards by Organization.

- **URL**

  `/boards/organization/:id`

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

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": 9,
        "name": "Board 2",
        "OrganizationId": 5,
        "createdAt": "2021-01-13T06:04:11.210Z",
        "updatedAt": "2021-01-13T06:04:11.210Z"
      }
    ]
    ```

- **Error Response:**

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
    curl --location --request GET 'http://localhost:3000/categories/board/8' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

## **Deatil Boards**

Show detail Boards include Categories.

- **URL**

  `/boards/:id`

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

  - id (integer)

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": 8,
      "name": "Board 1",
      "OrganizationId": 5,
      "createdAt": "2021-01-12T16:13:48.080Z",
      "updatedAt": "2021-01-12T16:13:48.080Z",
      "Categories": [
        {
          "id": 6,
          "name": "Notes",
          "BoardId": 8,
          "createdAt": "2021-01-13T05:49:42.087Z",
          "updatedAt": "2021-01-13T05:49:42.087Z"
        }
      ]
    }
    ```

- **Error Response:**

  - **Code:** 403 Forbidden <br />
    **Content:**

    ```json
    [
      {
        "message": "You are not member"
      }
    ]
    ```

    - **Code:** 404 Not Found <br />
      **Content:**

    ```json
    [
      {
        "message": "Board not found"
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
    curl --location --request GET 'http://localhost:3000/boards/8' --header 'Authorization: Bearer <JWT_TOKE>'
    ```

## **Destroy Board**

Destroy Board.

- **URL**

  `/boards/:id`

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
      "message": "Board has been deleted"
    }
    ```

- **Error Response:**

  - **Code:** 400 Bad Request <br />
    **Content:**

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
        "message": "You are not Admin"
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
    curl --location --request DELETE 'http://localhost:3000/boards/8' --header 'Authorization: Bearer <JWT_TOKEN>'
    ```

# User

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
