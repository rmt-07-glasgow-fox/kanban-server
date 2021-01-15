**Kanban**

### GET/TASKS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "title": "string",
            "category": "string",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/TASKS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 201
    * **content**
    ```json
    [
        {
            "title": "string",
            "category": "string",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### GET/TASKS/:id

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "title": "string",
            "category": "string",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 404
    * **content**
    ```json
    [
        {
            "message": "Data Not Found"
        }
    ]
    ```
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### PUT/TASKS

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "title": "string",
            "category": "string",
            "description": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```


### DELETE/TASKS/:id

* **REQUEST HEADERS**
    * **content**
    ```json
    [
        {
            "access_token": "string"
        }
    ]
    ```
* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "message": "Task Has Been Succesfully Deleted"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 404
    * **content**
    ```json
    [
        {
            "message": "Data Not Found"
        }
    ]
    ```
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/REGISTER

* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "id": "string",
            "email": "string"
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```

### POST/LOGIN

* **SUCCESS RESPONSE**
    * **code** 200
    * **content**
    ```json
    [
        {
            "access_token": "string",
        }
    ]
    ```
* **ERROR RESPONSE**
    * **code** 500
    * **content**
    ```json
    [
        {
            "message": "Internal Server Error"
        }
    ]
    ```


