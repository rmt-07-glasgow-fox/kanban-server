# fancy-todo

**REGISTER USER**
----
  <_Register User _>

* **URL**

  `users/register`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**
    ```json
        {
          "id": 3,
          "body": "ted ",
          "email": "tedgeorge@gmail.com"
        }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
        {
          "data": {
              "id": 3,
              "name": "ted ",
              "email": "tedgeorge@gmail.com"
            }
        }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
        {
            "message": [
                "name cannot be empty",
                "password cannot be empty"
            ]
        }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```json
        { 
            "message" : "internal server error" 
        }
    ```


**LOGIN USER**
----
  <_LOGIN User _>

* **URL**

  `users/login`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**
    ```json
        {
          "data": {
              "id": 3,
              "name": "ted ",
              "email": "tedgeorge@gmail.com"
            }
        }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
        {
          "access_token":"asdadasdwdasaedasda"
        }
    ```
 
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
        {
            "message": [
                "name cannot be empty",
                "password cannot be empty"
            ]
        }
    ```

  * **Code:** 404 <br />
    **Content:** 
    ```json
        {
            "message": "wrong email/password"
        }
    ```

  * **Code:** 500 <br />
    **Content:** 
    ```json
        { 
            "message" : "internal server error" 
        }
    ```

**SHOW ALL TASK**
----
  <_SHOW TASK _>

* **URL**

  `/tasks`

* **Method:**

  `GET`
  
*  **URL Params**

    Required: 

    `none`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
      {
        "id": 9,
        "name": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "category": "Doing",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ]
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```






**DELETE TASK**
----
  <_DELETE TASK _>

* **URL**

  `/tasks/:id`

* **Method:**

  `DELETE`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**

  `none`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "message": "task successfully deleted"
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "task not found"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this task"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```

**UPDATE TASK CATEGORY**
----
  <_UPDATE TASK CATEGORY _>

* **URL**

  `/tasks/:id`

* **Method:**

  `PATCH`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Data Params**
    ```json
      {
        "category": "doing"
      }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "name": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "category": "doing",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "todo not found!"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```


**UPDATE TASK**
----
  <_UPDATE TASK _>

* **URL**

  `/tasks/:id`

* **Method:**

  `PUT`
  
*  **URL Params**

    Required: 

    `id =[integer]`

* **Body**
    ```json
      {
        "id": 9,
        "name": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "category": "doing",
        "UserId": 2
      }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "name": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "category": "doing",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```


  * **Code:** 404  <br />
    **Content:** 
    ```json
        {
            "message": "todo not found!"
        }
    ```

  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": "date must be greater than now"
        }
    ```

  * **Code:** 401  <br />
    **Content:** 
    ```json
        {
            "message": "you are not authorize with this todo"
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```


**CREATE TASK**
----
  <_CREATE TASK _>

* **URL**

  `/tasks/:id`

* **Method:**

  `POST`
  
*  **URL Params**

    Required: 

    `none`

* **Body**
    ```json
      {
        "id": 9,
        "name": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "category": "doing",
        "UserId": 2
      }
    ```

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** 
    ```json
      {
        "id": 9,
        "name": "manjat pohon toge",
        "description": "manjat pohon sekolah",
        "category": "doing",
        "createdAt": "2020-11-25T16:01:28.995Z",
        "updatedAt": "2020-11-25T16:01:28.996Z",
        "UserId": 2
      }
    ```
 
* **Error Response:**

  * **Code:** 500 <br />
    **Content:** 
    ```json
        {
            "message": "internal server error"
        }
    ```

  * **Code:** 400  <br />
    **Content:** 
    ```json
        {
            "message": [
              "name cannot be empty",
              "description cannot be empty",
              "category cannot be empty"
              ]
        }
    ```

  * **Code:** 401 <br />
    **Content:** 
    ```json
        {
            "message": "please login first"
        }
    ```