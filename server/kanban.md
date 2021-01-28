# Kanvan Web App Server
Kanvan is a Web Application to Manage and Distribute Task of Your Team or Group. This Web App has:
- RESTful endpoint for Kanvan's CRUD Operation
- JSON formatted response

# URL
```
http://localhost:5555
```
# Method
## POST/login
### *Request Header*

```Not Needed```
### *Request Body*

```js
{
    email: "<string>",
    password: "<string>"
}
```
### *Success Response*
```js
Code: 201 Created
Content: 
{
    access_token: "<your access_token>"
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    message: ["<error_messages>"]
}
```

## POST /register
### *Request Header*

```Not Needed```
### *Request Body*

```js
{
    username: "<string>",
    email: "<string>",
    password: "<string>"
}
```
### *Success Response*
```js
Code: 201 Created
Content: 
{
    id: "<integer>",  
    username: "<string>",
    email: "<string>",
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    message: ["<error_messages>"]
}
```

## GET /tasks
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```
### *Success Response*
```js
Code: 200 OK
Content: 
{
    id: "<integer>",  
    title: "<string>",
    description: "<string>",
    assign_to: "<string>",
    category: "<string>",
    createdAt: "<string>",
    updatedAt: "<string>"
}, ...
```

### *Error Response*
```js
Code: 500 Internal Server Error
Content:
{
    message: ["<Internal Server Error>"]
}
```

## POST /tasks
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{ 
    title: "<string>",
    description: "<string>",
    assign_to: "<string>",
    category: "<string>"
}
```
### *Success Response*
```js
Code: 201 Created
Content: 
{ 
    id: "<integer>",  
    title: "<string>",
    description: "<string>",
    assign_to: "<string>",
    category: "<string>",
    createdAt: "<string>",
    updatedAt: "<string>"
}
```

### *Error Response*
```js
Code: 400 Bad Request
Content:
{
    message: ["<error_message>"]
}
```
OR
```js
Code: 500 Internal Server Error
Content:
{
    message: ["<Internal Server Error>"]
}
```

## GET /tasks/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```
### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 200 OK
Content: 
{ 
    id: <integer>,
    title: "<string>",
    description: "<string>",
    assign_to: "<string>",
    category: "<string>",
    createdAt: "<string>",
    updatedAt: "<string>",
    UserId: <integer>
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "message": ["<Error Not Found>"],
    
}
```

## PUT /tasks/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{
    title: "<string>",
    description: "<string>",
    assign_to: "<string>",
}
```
### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 201 Created
Content: 
{ 
    message: "SuccessFully Update Task"
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "message": ["<Error Not Found>"],
    
}
```
OR
```js
Code: 500 Server Internal Error 
Content:
{
    "message": ["<Internal Server Error>"],
    
}
```

## PATCH /tasks/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```js
{
    category: "<string>"
}
```
### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 201 Created
Content: 
{ 
    message: "SuccessFully Update Task"
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "message": ["<Error Not Found>"],
    
}
```
OR
```js
Code: 500 Server Internal Error 
Content:
{
    "message": ["<Internal Server Error>"],
    
}
```

## DELETE /tasks/:id
### *Request Header*

```js
{
    access_token: "<token_jwt>"
}
```
### *Request Body*

```
Not Needed
```

### *Request Params*

```js
{
    id: "<integer>"
}
```

### *Success Response*
```js
Code: 200 OK
Content: 
{ 
    message: "Task Succesfully Deleted"
}
```

### *Error Response*
```js
Code: 404 Not Found
Content:
{
    "message": ["<Not Found>"],
    
}
```
OR
```js
Code: 500 Internal Server Error
Content:
{
    "message": ["<Internal Server Error>"],
    
}
```