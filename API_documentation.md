# KANBAN TASKS API DOCUMENTATION

### URL : https://kanban-server-samm021.herokuapp.com
#

1. POST /tasks 
    * url:   
        - `https://kanban-server-samm021.herokuapp.com/tasks`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request body
    > ```json
    > {
    >   "title": "Makan",
    >   "detail": "Makan siang jam 12",
    >   "due_date": "2021-01-15T00:00:00.000Z", 
    > } 
    > ```

    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Makan",
    >   "detail": "Makan siang jam 12",
    >   "due_date": "2021-01-15T00:00:00.000Z",
    >   "updatedAt": "2021-01-15T13:12:17.825Z",
    >   "createdAt": "2021-01-15T13:12:17.825Z",
    >   "category": "todo",
    >   "UserId": 1,
    >
    > } 
    > ```

    * Error Response

        1. Server error (500)
        
        > ```json
        > { 
        >    "message": "internal server error"  
        > }
        >```

        2.  Bad request (400)
        
        > ```json
        > { 
        >    "message": "Please login first"  
        > }
        >```

        3. Sequelize Validation error (400)
        > ```json
        > { 
        >    "message": "Please input title" 
        > }
        >```

2. GET /tasks
    * url:     
        - `https://kanban-server-samm021.herokuapp.com/tasks`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token" 
    > }
    >```

    * Success Response
    > ```json
    >   [
    >    {
    >        "id": 1,
    >        "title": "ngantuk",
    >        "detail": "ngantuk karena agak lambat ngerjain",
    >        "category": "todo",
    >        "due_date": "2021-12-12T00:00:00.000Z",
    >        "UserId": 1,
    >        "User": {
    >           "name": "Mail"
    >    },
    >    {
    >        "id": 2,
    >        "title": "nugas p2 d1",
    >        "detail": "rest api challenge",
    >        "category": "todo",,
    >        "due_date": "2021-12-12T00:00:00.000Z",
    >        "UserId": 1,
    >        "User": {
    >           "name": "Mail"     
    >   }
    >   ]
    > ```

    * Error Response

        1. Validation error (400)

        > ```json
        > { 
        >    "message": "Please input date greater than yesterday"  
        > }
        >```

        2. Server error (500)
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```

        3.  Bad request (400)
        
        > ```json
        > { 
        >    "message": "Please login first"  
        > }
        >```

3.  GET /tasks/:id
    * url: 
        - `https://kanban-server-samm021.herokuapp.com/tasks/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Makan",
    >   "detail": "Makan siang jam 12",
    >   "due_date": "2021-01-15T00:00:00.000Z",
    >   "updatedAt": "2021-01-15T13:12:17.825Z",
    >   "createdAt": "2021-01-15T13:12:17.825Z",
    >   "category": "todo",,
    >   "UserId": 1
    > } 
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (401)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Bad request (400)
        
        > ```json
        > { 
        >    "message": "Please login first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```

4. PUT /tasks/:id
    * url: 
        - `https://kanban-server-samm021.herokuapp.com/tasks/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Request Body
    > ```json
    > {
    >   "title": "Makan",
    >   "detail": "Makan siang jam 12",
    >   "due_date": "2021-01-15T00:00:00.000Z", 
    > } 
    > ```


    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Makan",
    >   "detail": "Makan siang jam 12",
    >   "due_date": "2021-01-15T00:00:00.000Z",
    >   "updatedAt": "2021-01-15T13:12:17.825Z",
    >   "createdAt": "2021-01-15T13:12:17.825Z",
    >   "category": "todo",,
    >   "UserId": 1
    > } 
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (401)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Bad request (400)
        
        > ```json
        > { 
        >    "message": "Please login first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```

        5. Sequelize Database error (400)
        > ```json
        > { 
        >    "message": "Please input date" 
        > }
        >```

        6. Sequelize Validation error (400)
        > ```json
        > { 
        >    "message": "Please input title" 
        > }
        >```
        

5. PATCH /tasks/:id
    * url: 
        - `https://kanban-server-samm021.herokuapp.com/tasks/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token"   
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Request Body
    > ```json
    > {
    >   "category": "todo",
    > } 
    > ```

    * Success Response
    > ```json
    > {
    >   "id": 1,
    >   "title": "Makan",
    >   "detail": "Makan siang jam 12",
    >   "due_date": "2021-01-15T00:00:00.000Z",
    >   "updatedAt": "2021-01-15T13:12:17.825Z",
    >   "createdAt": "2021-01-15T13:12:17.825Z",
    >   "category": "todo",
    >   "UserId": 1
    > } 
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (401)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Bad request (400)
        
        > ```json
        > { 
        >    "message": "Please login first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```

6. DELETE /tasks/:id
    * url: 
        - `https://kanban-server-samm021.herokuapp.com/tasks/:id`

    * Request header
    > ```json
    > { 
    >    "Content-Type": "application/json",
    >    "access_token": "access_token" 
    > }
    >```

    * Request Params
    > ```json
    > {
    >   "id": 1
    > }

    * Success Response
    > ```json
    > {
    >   "message": "Success, task deleted"
    > }
    > ```

    * Error Response

        1. Not found (404)
        > ```json
        > { 
        >    "message": "Not Found" 
        > }
        >```

        2. Not Authorized (401)
        > ```json
        > { 
        >    "message": "You're not authorized to access this item" 
        > }
        >```

        3.  Bad request (400)
        
        > ```json
        > { 
        >    "message": "Please login first"  
        > }
        >```

        4. Server error (500)
        > ```json
        > { 
        >    "message": "internal server error" 
        > }
        >```