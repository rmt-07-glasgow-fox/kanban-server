# kanban-server
### API LIST
| ROUTES         | METHODS | DESCRIPTION                    |
|----------------|---------|--------------------------------|
| `/tasks`       | POST    | In Need To add tasks           |
| `/tasks`       | GET     | In Need To see tasks           |
| `/tasks/:id`   | GET     | In Need To see value           |
| `/tasks/:id`   | PUT     | In Need To update tasks        |
| `/tasks/:id`   | PATCH   | In Need To change categoryId   |
| `/tasks/:id`   | DELETE  | In Need To delete tasks        |
| `/category`    | POST    | In Need To add category        |
| `/category`    | GET     | In Need To see category        |
| `/category/:id`| GET     | In Need To see value           |
| `/category/:id`| PUT     | In Need To update category     |
| `/category/:id`| DELETE  | In Need To delete category     |
| `/register`    | POST    | In Need To register user       |
| `/login`       | POST    | In Need To login user          |
| `/loginGoogle` | POST    | In Need To google login        |
| `/user`        | GET     | In Need To get user list       |


### ERROR RESPONSE 
| STATUS |       ERROR DESC                 |
|--------|-------------------------         |
|   400  | SequelizeDatabaseError           |
|   401  | InvalidUser                      |
|   400  | SequelizeUniqueConstraintError   |
|   404  | ResourceNotFound                 |
|   400  | SequelizeValidationError         |
|   500  | "detailed err name"              |

### GUIDE
1. Clone this Repository
2. Install package based on package.json
3. create `.env` file with value that i mention in description 
4. to start `npm run dev`