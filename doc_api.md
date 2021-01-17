# Todo App Server
Todo App is an application to manage your assets. This app has : 
* RESTful endpoint for asset's CRUD operation
* JSON formatted response

&nbsp;
# All endpoints in server
list endpoints:
- POST /register
- POST /login
- GET /kanban
- GET /kanban/:id
- POST /kanban
- PUT /kanban/:id
- DELETE /kanban/:id

&nbsp;
# RESTful endpoints

### POST /register/


_Request:_

- body : 

    ```json
    {
        "email" : "mail@email.com",
        "passoword" : "password"
    }
    ```

_Response:_
- body
    ```json
    {
        "id": 1,
        "email": "mail@email.com",
        "createdAt": "2020-06-08T03:33:04.404Z"
    },
    ```

### POST /login/
_Request_
- body

    ```json
    {
        "email" : "mail@email.com",
        "passoword" : "password"
    }
    ```
_Response_
- body

    ```json
    {
        "access_token":"youraccesstoken"
    },
    ```

### GET /kanban
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
_Response_
- body

    ```json
    
        [
            {
                "id": 1,
                "title": "makan",
                "category": "todo",
                "UserId": 1,
                "createdAt": "2021-01-12T16:12:55.843Z",
                "updatedAt": "2021-01-12T16:12:55.843Z"
            },
            {
                "id": 2,
                "title": "minum",
                "category": "done",
                "UserId": 1,
                "createdAt": "2021-01-12T16:13:04.666Z",
                "updatedAt": "2021-01-12T16:20:04.483Z"
            }
            ...
        ]
    
    ```

### POST /kanban
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
- body

    ```json
    {
        "title": "yourtitle",
        "category": "category"
    }
    ```

_Response_
- body

    ```json  
    {
        "id": "kanbanid",
        "title": "yourtitle",
        "description": "yourdescription",
        "status": "boolean status",
        "due_date": "timestamp due date",
        "UserId": "user_id_of_this_kanban",
        "createdAt": "timestamp created_at",
        "updatedAt": "timestamp updated_at"
    }
    ```

### DELETE /kanban/:id
_Request_
- headers

    ```json
    {
        "access_token":"youraccesstoken"
    }
    ```
- params

    ```json
    {
        "id":"kanbanid"
    }
    ```

_Response_
- body

    ```json  
    {
        "messages": "delete sukses",
        "result": 1
    }
    ```

### GET /weather
_Request:_

- headers 

    ```json
    {
    "access_token" : "jwt_access_token"
    }
    ```
- params 

    ```json
    {
    "lat" : "<latitude>",
    "lon" : "<longitude>"
    }
    ```

_Response:_

- body 

    ```json
    {
        "coord": {
            "lat" : "<latitude>",
            "lon" : "<longitude>"},
        "weather": [{
                "id": "<id>",
                "main": "Rain",
                "description": "light rain",
                "icon": "10n"}],
        "base": "stations",
        "main": {
            "temp": "<number>",
            "feels_like": "<number>",
            "temp_min": "<number>",
            "temp_max": "<number>",
            "pressure": "<number>",
            "humidity": "<number>",
            "sea_level": "<number>",
            "grnd_level": "<number>"},
        "visibility": "<number>",
        "wind": {
            "speed": "<number>",
            "deg": "<number>"},
        "rain": {
            "1h": "<number>"},
        "clouds": {
            "all": "<number>"},
        "dt": "<timestamp>",
        "sys": {
            "country": "ID",
            "sunrise": "<timestamp>",
            "sunset": "<timestamp>"},
        "timezone": "<number>",
        "name": "<city>",
        "cod": 200
    }
    ```