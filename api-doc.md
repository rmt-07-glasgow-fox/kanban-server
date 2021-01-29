## **Kanban Server**

### User Login

- **URL**
  `/login`

- **Method:**
  `POST`
- **Data Params**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "access_token": "string",
      "email": "string"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 401 UNAUTHORIZED <br />
    **Content:**
    ```json
    {
      "message": "Unauthorized. Something's went wrong check your email or password."
    }
    ```

- **Sample Call:**

  `localhost:3000/login`

### User Register

- **URL**
  `/register`

- **Method:**
  `POST`
- **Data Params**
  ```json
  {
    "email": "string",
    "password": "string",
    "first_name": "string",
    "last_name": "string"
  }
  ```
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<user's id>",
      "email": "string"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 500 NTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["<field> must be unique"]
    }
    ```

  OR

  - **Code:** 500 NTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["<field> is required"]
    }
    ```

- **Sample Call:**

  `localhost:3000/register`

## Get All Tasks

- **URL**
  `/tasks`

- **Method:**
  `GET`
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<id>",
        "title": "<task's name>",
        "createdAt": "<created date>",
        "updatedAt": "<updated date>",
        "CategoryId": "<id>",
        "UserId": "<id>",
        "Category": {
          "id": "<id>",
          "name": "<category's name>",
          "createdAt": "<created date>",
          "updatedAt": "<updated date>"
        }
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "Forbidden."
    }
    ```

- **Sample Call:**

  `localhost:3000/tasks`

## Get task By Id

- **URL**
  `/tasks/<task_id>`

- **Method:**
  `GET`

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    {
      "id": "<id>",
      "title": "<task's name>",
      "createdAt": "<created date>",
      "updatedAt": "<updated date>",
      "CategoryId": "<id>",
      "UserId": "<id>",
      "Category": {
        "id": "<id>",
        "name": "<category's name>",
        "createdAt": "<created date>",
        "updatedAt": "<updated date>"
      }
    },
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**

    ```json
    {
      "message": "Data not found."
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "Forbidden"
    }
    ```

- **Sample Call:**

  `localhost:3000/tasks/<task_id>`

## Create a task

- **URL**
  `/tasks`

- **Method:**
  `POST`
- **Data Params**

  **Content:**

  ```json
  {
    "title": "<task's title>",
    "CategoryId": "<task's category id>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "<id>",
      "title": "<task's title>",
      "UserId": "<id>",
      "CategoryId": "<id>",
      "createdAt": "<created date>",
      "updatedAt": "<updated date>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "Forbidden"
    }
    ```

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["Title field is required."]
    }
    ```

- **Sample Call:**

  `localhost:3000/tasks`

## Edit a task By Id

- **URL**
  `/tasks/<task's id>`

- **Method:**
  `PUT`
- **Data Params**

  **Content:**

  ```json
  {
    "title": "<task's title>",
    "CategoryId": "<task's category id>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your task has been saved."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "Forbidden"
    }
    ```

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "errors": ["<Fields is required>"]
    }
    ```

    OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/tasks/<task's id>`

## Delete a task By Id

- **URL**
  `/tasks/<task's id>`

- **Method:**
  `DELETE`
- **Data Params**

  **Content:**

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "message": "Success your task has been deleted."
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "Forbidden"
    }
    ```

  OR

  - **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
    {
      "message": "Data not found."
    }
    ```

- **Sample Call:**

  `localhost:3000/tasks/<task's id>`

## Get All Categories

- **URL**
  `/categories`

- **Method:**
  `GET`
- **Success Response:**

  - **Code:** 200 <br />
    **Content:**
    ```json
    [
      {
        "id": "<id>",
        "name": "<category's name>",
        "createdAt": "<created date>",
        "updatedAt": "<updated date>"
      }
    ]
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "Forbidden."
    }
    ```

- **Sample Call:**

  `localhost:3000/categories`

## Create a category

- **URL**
  `/categories`

- **Method:**
  `POST`

- **Data Params**

  **Content:**

  ```json
  {
    "name": "<category's title>"
  }
  ```

- **Headers**

  **Content**

  ```json
  {
    "access_token": "<access_token>"
  }
  ```

- **Success Response:**

  - **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "<id>",
      "name": "<category's name>",
      "createdAt": "<created date>",
      "updatedAt": "<updated date>"
    }
    ```

- **Error Response:**

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**

    ```json
    {
      "message": "Internal server error"
    }
    ```

    OR

  - **Code:** 403 FORBIDDEN <br />
    **Content:**

    ```json
    {
      "message": "Forbidden"
    }
    ```

    OR

  - **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:**
    ```json
    {
      "errors": ["Category name field is required."]
    }
    ```

- **Sample Call:**

  `localhost:3000/categories`
