# kanban-server

# kanban-app API-DOC

## **Register**
- method: `POST`
- url:
  - `/register`
- request:
  - body
    - `{ email: 'haha@mail.com', password: 'haha' }`
- response:
  - `201`: `{ id:1, email: 'haha@mail.com' }`
  - `400`: `{ 'Input Validations Error' }`


## **Login**

- method: `POST`
- url:
  - `/login`
- request:
  - body
    - `{ email: 'haha@mail.com', password: 'haha' }`
- response:
  - `200`: `{ access_token: '...' }`
  - `401`: `{ 'Wrong Email/Password' }`

## **Add new Task**


- method: `POST`
- url:
  - `/tasks`
- request
  - headers
    - `{ access_token }`
- body
  - `{ "title": "makan ayam", "description": ayam bakar, "category": "backlog" }`
- response
  - `201`: `{ "id": 1, "title": "makan ayam", "description": ayam bakar, "category": "backlog",  "UserId": 1 }`
  - `400`: `{ 'Input Validations Error' }`


## **Fetch Tasks**


- method: `GET`

- url:
  - `/tasks`
- request
  - headers
    - `{ access_token }`
- response
  - `200`: `[{ "id": 1, "title": "makan ayam", "description": ayam bakar, "category": "backlog",  "UserId": 1 }, ...]`
  - `500`: `{ 'Internal Server Error' }`

## **Edit Task**


- method: `PUT`
- url:
  - `/tasks/:id`
- request
  - params
    - `{ id }`
  - headers
    - `{ access_token }`
- body
  - `{ "title": "makan ayam", "description": ayam bakar, "category": "backlog" }`
- response
  - `201`: `{ "id": 1, "title": "makan ayam", "description": ayam bakar, "category": "backlog",  "UserId": 1 }`
  - `400`: `{ 'Input Validations Error' }`

## **Patch Task**


- method: `PATCH`
- url:
  - `/tasks/:id`
- request
  - params
    - `{ id }`
  - headers
    - `{ access_token }`
- body
  - `{ "category": "inProgress" }`
- response
  - `201`: `{ "id": 1, "title": "makan ayam", "description": ayam bakar, "category": "inProgress",  "UserId": 1 }`
  - `404`: `{ 'Task Not Found' }`





## **Delete Tasks**



- method: `DELETE`
- url:
  - `/tasks/:id`
- request
  - params
    - `{ id }`
  - headers
    - `{ access_token }`
- response:
  - `200`: `{ "message": "Task deleted successfully"  }`
  - `404`: `{ 'Task Not Found' }`